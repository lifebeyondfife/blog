import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { ImageManifest } from '@/types/images';
import { IMAGES_DIRECTORY, GENERATED_DIRECTORY } from '../src/lib/constants';

const PROJECT_ROOT = process.cwd();
const ORIGINALS_DIR = path.join(PROJECT_ROOT, IMAGES_DIRECTORY, 'originals');
const OPTIMISED_DIR = path.join(PROJECT_ROOT, IMAGES_DIRECTORY, 'optimised');
const MANIFEST_PATH = path.join(PROJECT_ROOT, GENERATED_DIRECTORY, 'image-manifest.json');

const WIDTHS = [640, 960, 1280, 1920] as const;
const FORMATS = ['webp', 'jpg'] as const;
const QUALITY = { webp: 80, jpg: 85 } as const;
const SHARP_FORMAT_MAP: Record<string, 'webp' | 'jpeg'> = {
  webp: 'webp',
  jpg: 'jpeg',
};
const SUPPORTED_EXTENSIONS = ['.gif', '.jpg', '.jpeg', '.png', '.webp'];

interface ProcessingStats {
  totalImages: number;
  totalVariants: number;
  skipped: number;
  errors: number;
}

async function ensureDirectory(dir: string): Promise<void> {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function getImageFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) =>
        entry.isFile() &&
        SUPPORTED_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())
      )
      .map((entry) => entry.name);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function shouldProcessImage(
  inputPath: string,
  outputDir: string
): Promise<boolean> {
  try {
    const inputStat = await fs.stat(inputPath);

    try {
      const outputFiles = await fs.readdir(outputDir);
      if (outputFiles.length === 0) return true;

      for (const file of outputFiles) {
        const outputStat = await fs.stat(path.join(outputDir, file));
        if (outputStat.mtime < inputStat.mtime) {
          return true;
        }
      }
      return false;
    } catch {
      return true;
    }
  } catch {
    return true;
  }
}

async function isAnimatedGif(inputPath: string): Promise<boolean> {
  try {
    const image = sharp(inputPath, { animated: true });
    const metadata = await image.metadata();
    return metadata.format === 'gif' && (metadata.pages ?? 1) > 1;
  } catch {
    return false;
  }
}

async function processAnimatedGif(
  inputPath: string,
  outputDir: string,
  stats: ProcessingStats
): Promise<void> {
  console.log('    ℹ️  Processing as animated GIF');
  
  const image = sharp(inputPath, { animated: true });
  const metadata = await image.metadata();
  
  const webpPath = path.join(outputDir, `${metadata.width}.webp`);
  try {
    await image
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath);
    
    stats.totalVariants++;
    console.log(`    ✓ Created ${metadata.width}.webp (animated)`);
  } catch (error) {
    console.error(`    ✗ Failed to create animated WebP:`, error);
    stats.errors++;
  }

  const gifPath = path.join(outputDir, `${metadata.width}.gif`);
  try {
    await fs.copyFile(inputPath, gifPath);
    stats.totalVariants++;
    console.log(`    ✓ Copied ${metadata.width}.gif (fallback)`);
  } catch (error) {
    console.error(`    ✗ Failed to copy original GIF:`, error);
    stats.errors++;
  }
}

async function processImage(
  filename: string,
  stats: ProcessingStats,
  manifest: ImageManifest
): Promise<void> {
  const baseName = path.parse(filename).name;
  const inputPath = path.join(ORIGINALS_DIR, filename);
  const outputDir = path.join(OPTIMISED_DIR, baseName);

  if (!(await shouldProcessImage(inputPath, outputDir))) {
    console.log(`  ⏭️  Skipping ${filename} (up to date)`);
    stats.skipped++;

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const availableSizes: number[] = [];

    const validWidths = WIDTHS.filter(width => width <= (metadata.width || 0));
    const sizesToCheck = validWidths.length > 0 ? validWidths : [metadata.width || 0];

    for (const width of sizesToCheck) {
      const webpPath = path.join(outputDir, `${width}.webp`);
      try {
        await fs.access(webpPath);
        availableSizes.push(width);
      } catch {
      }
    }

    manifest[baseName] = {
      originalWidth: metadata.width || 0,
      originalHeight: metadata.height || 0,
      availableSizes,
      isAnimated: await isAnimatedGif(inputPath)
    };
    return;
  }

  console.log(`  📷 Processing: ${filename}`);

  await ensureDirectory(outputDir);

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const availableSizes: number[] = [];

  const isAnimated = await isAnimatedGif(inputPath);

  if (isAnimated) {
    await processAnimatedGif(inputPath, outputDir, stats);
    availableSizes.push(metadata.width || 640);
  } else {
    const validWidths = WIDTHS.filter(width => width <= (metadata.width || 0));

    if (validWidths.length === 0) {
      availableSizes.push(metadata.width || 0);

      for (const format of FORMATS) {
        const outputPath = path.join(outputDir, `${metadata.width}.${format}`);
        const sharpFormat = SHARP_FORMAT_MAP[format];

        try {
          await sharp(inputPath)
            [sharpFormat]({ quality: QUALITY[format] })
            .toFile(outputPath);

          stats.totalVariants++;
          console.log(`    ✓ Created ${metadata.width}.${format}`);
        } catch (error) {
          console.error(`    ✗ Failed to create ${metadata.width}.${format}:`, error);
          stats.errors++;
        }
      }
    } else {
      for (const width of validWidths) {
        availableSizes.push(width);

        for (const format of FORMATS) {
          const outputPath = path.join(outputDir, `${width}.${format}`);
          const sharpFormat = SHARP_FORMAT_MAP[format];

          try {
            await sharp(inputPath)
              .resize(width, undefined, {
                withoutEnlargement: true,
                fit: 'inside',
              })
              [sharpFormat]({ quality: QUALITY[format] })
              .toFile(outputPath);

            stats.totalVariants++;
            console.log(`    ✓ Created ${width}.${format}`);
          } catch (error) {
            console.error(`    ✗ Failed to create ${width}.${format}:`, error);
            stats.errors++;
          }
        }
      }
    }
  }

  manifest[baseName] = {
    originalWidth: metadata.width || 0,
    originalHeight: metadata.height || 0,
    availableSizes,
    isAnimated
  };
}

async function main(): Promise<void> {
  console.log('🚀 Starting image optimization...\n');

  const stats: ProcessingStats = {
    totalImages: 0,
    totalVariants: 0,
    skipped: 0,
    errors: 0,
  };

  const manifest: ImageManifest = {};

  try {
    await ensureDirectory(OPTIMISED_DIR);
    await ensureDirectory(path.dirname(MANIFEST_PATH));

    const imageFiles = await getImageFiles(ORIGINALS_DIR);

    if (imageFiles.length === 0) {
      console.log(`⚠️  No images found in ${ORIGINALS_DIR}`);
      console.log('   Add images to process and run again.\n');

      await fs.writeFile(MANIFEST_PATH, JSON.stringify({}, null, 2));
      return;
    }

    console.log(`📁 Found ${imageFiles.length} image(s) to process\n`);
    stats.totalImages = imageFiles.length;

    for (const file of imageFiles) {
      try {
        await processImage(file, stats, manifest);
      } catch (error) {
        console.error(`  ✗ Error processing ${file}:`, error);
        stats.errors++;
      }
    }

    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`\n📝 Wrote image manifest to ${MANIFEST_PATH}`);

    console.log('\n✨ Image optimization complete!\n');
    console.log('Summary:');
    console.log(`  Total images: ${stats.totalImages}`);
    console.log(`  Variants created: ${stats.totalVariants}`);
    console.log(`  Skipped (up to date): ${stats.skipped}`);
    if (stats.errors > 0) {
      console.log(`  Errors: ${stats.errors}`);
    }
    console.log(`\n📂 Output directory: ${OPTIMISED_DIR}\n`);

    if (stats.errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

main();

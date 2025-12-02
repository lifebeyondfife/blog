import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { IMAGES_DIRECTORY } from '../src/lib/constants';

const ORIGINALS_DIR = path.join(process.cwd(), IMAGES_DIRECTORY, 'originals');
const OPTIMISED_DIR = path.join(process.cwd(), IMAGES_DIRECTORY, 'optimised');

const WIDTHS = [640, 960, 1280, 1920];
const FORMATS = ['webp', 'jpeg'] as const;

const QUALITY = {
  webp: 80,
  jpeg: 85,
};

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
      .filter((entry) => {
        if (!entry.isFile()) return false;
        const ext = path.extname(entry.name).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
      })
      .map((entry) => entry.name);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(
        `Originals directory not found: ${dir}\nPlease create it and add images to process.`
      );
    }
    throw error;
  }
}

async function shouldProcessImage(
  imagePath: string,
  outputDir: string
): Promise<boolean> {
  try {
    // Check if output directory exists
    await fs.access(outputDir);

    // Check if all expected variants exist
    for (const width of WIDTHS) {
      for (const format of FORMATS) {
        const variantPath = path.join(outputDir, `${width}.${format}`);
        await fs.access(variantPath);
      }
    }

    // If all variants exist, check if source is newer
    const sourceStats = await fs.stat(imagePath);
    const firstVariant = path.join(outputDir, `${WIDTHS[0]}.${FORMATS[0]}`);
    const variantStats = await fs.stat(firstVariant);

    return sourceStats.mtime > variantStats.mtime;
  } catch {
    // If any check fails, process the image
    return true;
  }
}

async function processImage(
  filename: string,
  stats: ProcessingStats
): Promise<void> {
  const inputPath = path.join(ORIGINALS_DIR, filename);
  const baseName = path.parse(filename).name;
  const outputDir = path.join(OPTIMISED_DIR, baseName);

  // Check if processing is needed
  if (!(await shouldProcessImage(inputPath, outputDir))) {
    console.log(`  ⏭️  Skipping ${filename} (up to date)`);
    stats.skipped++;
    return;
  }

  console.log(`  🖼️  Processing ${filename}...`);

  // Ensure output directory exists
  await ensureDirectory(outputDir);

  // Load the original image
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read dimensions for ${filename}`);
  }

  // Process each width and format combination
  for (const width of WIDTHS) {
    // Skip if requested width is larger than original
    if (width > metadata.width) {
      console.log(`    ⚠️  Skipping ${width}px (larger than original ${metadata.width}px)`);
      continue;
    }

    for (const format of FORMATS) {
      const outputPath = path.join(outputDir, `${width}.${format}`);

      try {
        await sharp(inputPath)
          .resize(width, undefined, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          [format]({ quality: QUALITY[format] })
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

async function main(): Promise<void> {
  console.log('🚀 Starting image optimization...\n');

  const stats: ProcessingStats = {
    totalImages: 0,
    totalVariants: 0,
    skipped: 0,
    errors: 0,
  };

  try {
    // Ensure optimised directory exists
    await ensureDirectory(OPTIMISED_DIR);

    // Get all image files
    const imageFiles = await getImageFiles(ORIGINALS_DIR);

    if (imageFiles.length === 0) {
      console.log(`⚠️  No images found in ${ORIGINALS_DIR}`);
      console.log('   Add images to process and run again.\n');
      return;
    }

    console.log(`📁 Found ${imageFiles.length} image(s) to process\n`);
    stats.totalImages = imageFiles.length;

    // Process each image
    for (const file of imageFiles) {
      try {
        await processImage(file, stats);
      } catch (error) {
        console.error(`  ✗ Error processing ${file}:`, error);
        stats.errors++;
      }
    }

    // Print summary
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

import fs from 'fs';
import path from 'path';
import { SITE_CONFIG, GENERATED_DIRECTORY } from '@/lib/constants';
import { RedirectEntry, CategoriesIndex } from '@/types/post';

interface LegacyRedirects {
  [key: string]: string;
}

interface SlugToCategory {
  [slug: string]: string;
}

const GENERATED_DIR = path.join(process.cwd(), GENERATED_DIRECTORY);
const REDIRECTS_INPUT_PATH = path.join(GENERATED_DIR, 'redirects.json');
const CATEGORIES_INPUT_PATH = path.join(GENERATED_DIR, 'categories.json');
const OUTPUT_PATH = path.join(GENERATED_DIR, 'cloudfront-redirect-function.js');
const SIZE_LIMIT_BYTES = 10240;

function ensureGeneratedDir(): void {
  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }
}

function loadRedirectEntries(): RedirectEntry[] {
  if (!fs.existsSync(REDIRECTS_INPUT_PATH)) {
    throw new Error(`Redirects file not found: ${REDIRECTS_INPUT_PATH}`);
  }

  const content = fs.readFileSync(REDIRECTS_INPUT_PATH, 'utf-8');
  return JSON.parse(content);
}

function loadCategoriesIndex(): CategoriesIndex {
  if (!fs.existsSync(CATEGORIES_INPUT_PATH)) {
    throw new Error(`Categories file not found: ${CATEGORIES_INPUT_PATH}`);
  }

  const content = fs.readFileSync(CATEGORIES_INPUT_PATH, 'utf-8');
  return JSON.parse(content);
}

function buildLegacyRedirects(entries: RedirectEntry[]): LegacyRedirects {
  const legacyRedirects: LegacyRedirects = {};

  for (const entry of entries) {
    const normalizedPath = `/${entry.legacySlug}`;
    legacyRedirects[normalizedPath] = entry.canonicalUrl;
  }

  console.log(`Built legacy redirects map with ${Object.keys(legacyRedirects).length} entries`);
  
  return legacyRedirects;
}

function buildSlugToCategoryMap(categoriesIndex: CategoriesIndex): SlugToCategory {
  const slugToCategory: SlugToCategory = {};
  
  for (const category of categoriesIndex.categories) {
    for (const slug of category.posts) {
      slugToCategory[slug] = category.slug;
    }
  }

  console.log(`Built slug-to-category mapping with ${Object.keys(slugToCategory).length} entries`);
  
  return slugToCategory;
}

function generateCloudFrontFunction(
  legacyRedirects: LegacyRedirects,
  slugToCategory: SlugToCategory
): string {
  const siteUrl = SITE_CONFIG.siteUrl;
  
  return `var siteUrl = '${siteUrl}';

var legacyRedirects = ${JSON.stringify(legacyRedirects, null, 2)};

var slugToCategory = ${JSON.stringify(slugToCategory, null, 2)};

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (legacyRedirects[uri]) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: legacyRedirects[uri] },
        'cache-control': { value: 'max-age=31536000' }
      }
    };
  }

  var paginationMatch = uri.match(/^\\/page\\/(\\d+)$/);
  if (paginationMatch) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: '/posts/page/' + paginationMatch[1] },
        'cache-control': { value: 'max-age=31536000' }
      }
    };
  }

  var slug = uri.replace(/^\\/|\\/$/g, '');
  if (slug && slugToCategory[slug]) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: siteUrl + '/' + slugToCategory[slug] + '/' + slug + '/' },
        'cache-control': { value: 'max-age=31536000' }
      }
    };
  }

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (!uri.split('/').pop().includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
`;
}

function checkFileSize(content: string): void {
  const sizeBytes = Buffer.byteLength(content, 'utf-8');
  const sizeKB = (sizeBytes / 1024).toFixed(2);

  console.log(`Generated CloudFront function size: ${sizeKB} KB (${sizeBytes} bytes)`);

  if (sizeBytes > SIZE_LIMIT_BYTES) {
    console.warn('');
    console.warn('⚠️  WARNING: CloudFront Function exceeds 10KB limit!');
    console.warn(`Current size: ${sizeKB} KB, Limit: 10 KB`);
    console.warn('');
    console.warn('The function will be rejected by CloudFront.');
    console.warn('Consider reducing the number of legacy redirects or implementing');
    console.warn('a different redirect strategy for some URLs.');
    console.warn('');
    throw new Error('CloudFront Function size exceeds 10KB limit');
  } else {
    console.log(`✓ Function is within CloudFront 10KB limit (${((sizeBytes / SIZE_LIMIT_BYTES) * 100).toFixed(1)}% used)`);
  }
}

function main(): void {
  console.log('Starting CloudFront redirect function generation...');
  console.log('');

  ensureGeneratedDir();

  console.log('Loading redirect entries...');
  const entries = loadRedirectEntries();
  console.log(`Loaded ${entries.length} legacy redirect entries`);
  console.log('');

  console.log('Loading categories index...');
  const categoriesIndex = loadCategoriesIndex();
  console.log(`Loaded ${categoriesIndex.categories.length} categories`);
  console.log('');

  console.log('Building legacy redirects object...');
  const legacyRedirects = buildLegacyRedirects(entries);
  console.log('');

  console.log('Building slug-to-category mapping...');
  const slugToCategory = buildSlugToCategoryMap(categoriesIndex);
  console.log('');

  console.log('Generating CloudFront Function...');
  const functionCode = generateCloudFrontFunction(legacyRedirects, slugToCategory);

  console.log('Writing output file...');
  fs.writeFileSync(OUTPUT_PATH, functionCode, 'utf-8');
  console.log(`✓ Generated ${OUTPUT_PATH}`);
  console.log('');

  checkFileSize(functionCode);

  console.log('');
  console.log('CloudFront redirect function generation complete!');
  console.log('The function is ready for deployment to AWS CloudFront.');
}

main();

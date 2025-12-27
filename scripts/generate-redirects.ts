import fs from 'fs';
import path from 'path';
import { SITE_CONFIG, GENERATED_DIRECTORY } from '@/lib/constants';
import { RedirectEntry, PostsIndex } from '@/types/post';

const GENERATED_DIR = path.join(process.cwd(), GENERATED_DIRECTORY);
const REDIRECTS_JSON_PATH = path.join(GENERATED_DIR, 'redirects.json');
const POSTS_INDEX_PATH = path.join(GENERATED_DIR, 'posts-index.json');
const OUTPUT_PATH = path.join(GENERATED_DIR, 'cloudfront-redirect-function.js');
const SIZE_LIMIT_BYTES = 10240;

function ensureGeneratedDir(): void {
  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }
}

function loadRedirectEntries(): RedirectEntry[] {
  if (!fs.existsSync(REDIRECTS_JSON_PATH)) {
    throw new Error(`Redirects file not found: ${REDIRECTS_JSON_PATH}`);
  }

  const content = fs.readFileSync(REDIRECTS_JSON_PATH, 'utf-8');
  return JSON.parse(content);
}

function loadPostsIndex(): PostsIndex {
  if (!fs.existsSync(POSTS_INDEX_PATH)) {
    throw new Error(`Posts index not found: ${POSTS_INDEX_PATH}`);
  }

  const content = fs.readFileSync(POSTS_INDEX_PATH, 'utf-8');
  return JSON.parse(content);
}

function calculateTotalPages(totalPosts: number): number {
  return Math.ceil(totalPosts / SITE_CONFIG.postsPerPage);
}

function buildRedirectsObject(entries: RedirectEntry[], totalPages: number): Record<string, string> {
  const redirects: Record<string, string> = {};

  for (const entry of entries) {
    const legacyPath = `/${entry.legacySlug}`;
    redirects[legacyPath] = entry.canonicalUrl;
  }

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const legacyPath = `/page/${pageNum}`;
    const canonicalUrl = `${SITE_CONFIG.siteUrl}/posts/page/${pageNum}/`;
    redirects[legacyPath] = canonicalUrl;
  }

  return redirects;
}

function generateCloudFrontFunction(redirectsObject: Record<string, string>): string {
  const redirectsJson = JSON.stringify(redirectsObject, null, 2);

  return `var siteUrl = '${SITE_CONFIG.siteUrl}';
var redirects = ${redirectsJson};

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  
  var lookupUri = uri.endsWith('/') && uri.length > 1 
    ? uri.slice(0, -1) 
    : uri;
  
  if (lookupUri in redirects) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: redirects[lookupUri] },
        'cache-control': { value: 'max-age=31536000' }
      }
    };
  }
  
  return request;
}`;
}

function checkFileSize(content: string): void {
  const sizeBytes = Buffer.byteLength(content, 'utf-8');
  const sizeKB = (sizeBytes / 1024).toFixed(2);

  console.log(`Generated function size: ${sizeKB} KB (${sizeBytes} bytes)`);

  if (sizeBytes > SIZE_LIMIT_BYTES) {
    console.warn('');
    console.warn('⚠️  WARNING: CloudFront Function exceeds 10KB limit!');
    console.warn('');
    console.warn('Consider these alternatives:');
    console.warn('  - Split redirects across multiple CloudFront Functions');
    console.warn('  - Use CloudFront Functions for high-traffic legacy URLs only');
    console.warn('  - Implement a fallback 404 page with client-side redirects for remaining URLs');
    console.warn('');
  }
}

function main(): void {
  console.log('Starting CloudFront redirect function generation...');

  ensureGeneratedDir();

  console.log('Loading redirect entries...');
  const entries = loadRedirectEntries();
  console.log(`Loaded ${entries.length} redirect entries`);

  console.log('Loading posts index...');
  const postsIndex = loadPostsIndex();
  const totalPages = postsIndex.totalPages || calculateTotalPages(postsIndex.totalPosts);
  console.log(`Total pages: ${totalPages}`);

  console.log('Building redirects object...');
  const redirectsObject = buildRedirectsObject(entries, totalPages);

  console.log('Generating CloudFront Function...');
  const functionCode = generateCloudFrontFunction(redirectsObject);

  console.log('Writing output file...');
  fs.writeFileSync(OUTPUT_PATH, functionCode, 'utf-8');
  console.log(`✓ Generated ${OUTPUT_PATH}`);

  checkFileSize(functionCode);

  console.log('\nCloudFront redirect function generation complete!');
}

main();

# NextJS Static Blog

A statically generated blog built with NextJS, optimised for high PageSpeed Insights scores and deployed to AWS S3 with CloudFront distribution.

## Project Overview

This project is a single-author blog migrated from legacy WordPress and Drupal installations. It uses NextJS with static export to generate a fully static site that can be hosted on S3 without server-side rendering. The architecture prioritises performance, accessibility, and SEO while maintaining backward compatibility with legacy URL structures through 301-equivalent redirects.

### Key Requirements

The site must achieve near-perfect scores (close to 100) across all Google PageSpeed Insights category: Performance, Accessibility, Best Practices, and SEO. To support this, all images are pre-optimised at build time, and metadata files are pre-generated to minimise runtime data fetching. Legacy URLs from previous WordPress and Drupal installations must redirect to current canonical URLs.

## Technology Stack

- **Framework:** NextJS 16.0.5 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Markdown Processing:** remark and rehype ecosystem
- **Image Optimisation:** sharp (build-time processing)
- **Hosting:** AWS S3 with CloudFront CDN

## Directory Structure

```
project-root/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout with metadata defaults
│   │   ├── page.tsx                  # Homepage (redirects to /posts or shows recent)
│   │   ├── not-found.tsx             # Custom 404 page
│   │   ├── posts/
│   │   │   └── page.tsx              # Paginated blog listing (page 1)
│   │   ├── posts/page/[page]/
│   │   │   └── page.tsx              # Paginated blog listing (page 2+)
│   │   ├── [category]/
│   │   │   ├── page.tsx              # Category listing with pagination
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual blog post
│   │   └── globals.css               # Global styles and Tailwind imports
│   ├── components/
│   │   ├── Header.tsx                # Site header with navigation
│   │   ├── Footer.tsx                # Site footer
│   │   ├── PostCard.tsx              # Post preview card for listings
│   │   ├── PostContent.tsx           # Rendered markdown content
│   │   ├── Pagination.tsx            # Numbered pagination controls
│   │   ├── CategoryList.tsx          # Category navigation/listing
│   │   └── OptimisedImage.tsx        # Responsive image component
│   ├── lib/
│   │   ├── posts.ts                  # Post data access utilities
│   │   ├── markdown.ts               # Markdown parsing utilities
│   │   ├── categories.ts             # Category utilities
│   │   └── constants.ts              # Site-wide constants
│   └── types/
│       └── post.ts                   # TypeScript interfaces
├── content/
│   └── posts/
│       └── *.md                      # Markdown blog posts
├── public/
│   ├── images/
│   │   ├── originals/                # Original high-resolution images
│   │   └── optimised/                # Generated optimised images
│   ├── favicon.ico
│   └── robots.txt
├── scripts/
│   ├── generate-metadata.ts          # Generates post index and category data
│   ├── optimise-images.ts            # Processes images to multiple sizes/formats
│   └── generate-redirects.ts         # Generates CloudFront Function for legacy redirects
├── generated/
│   ├── posts-index.json              # Lightweight post metadata index
│   ├── categories.json               # Category-to-post mappings
│   └── redirects.json                # Legacy slug to canonical URL mappings
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Configuration

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Using build-time optimisation instead
  },
};

module.exports = nextConfig;
```

The `output: 'export'` setting generates a fully static site in the `out/` directory. The `trailingSlash: true` setting ensures URLs end with a slash, which is required for S3 static hosting to correctly serve `index.html` files within directories.

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

The `@tailwindcss/typography` plugin provides sensible default styling for rendered Markdown content.

### Constants (src/lib/constants.ts)

```typescript
export const SITE_CONFIG = {
  title: 'Life Beyond Fife',
  description: 'Engineering from the glorious Kingdom',
  author: 'Iain McDonald',
  siteUrl: 'https://blog.chezmcdonald.info',
  postsPerPage: 5,
} as const;
```

## Content Authoring

### Post Frontmatter Schema

Each Markdown file in `content/posts/` must include YAML frontmatter with the following fields:

```yaml
---
title: "Post Title"
date: "2024-01-15"
category: "technology"
tags: # Optional
  - typescript
  - nextjs
  - web-development
excerpt: "A brief summary of the post content, used in listings and meta descriptions. Should be 150-160 characters for optimal SEO." # Optional, otherwise use first 100 words of post
legacySlug: "75-agile-html"  # Optional, only for migrated content
featuredImage: "my-post-image.jpg"  # Optional, references file in public/images/originals/
---

Post content begins here...
```

### Field Specifications

| Field | Required | Description |
|-------|----------|-------------|
| title | Yes | The post title, used in headings and page titles |
| date | Yes | Publication date in ISO 8601 format (YYYY-MM-DD) |
| category | Yes | Single category slug, used in URL path |
| tags | No | Array of tag slugs for classification |
| excerpt | No | Summary text for listings and meta descriptions |
| legacySlug | No | Previous URL path for redirect generation (migrated content only) |
| featuredImage | No | Filename of image in `public/images/originals/` |

### Naming Convention

Markdown files should be named using the post slug: `my-post-title.md`. The filename (without extension) becomes the slug used in the URL. The final URL for a post is constructed as `/{category}/{slug}/`.

## TypeScript Interfaces

### src/types/post.ts

```typescript
export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  legacySlug?: string;
  featuredImage?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  url: string;
}

export interface Post extends PostMeta {
  content: string;
}

export interface PostsIndex {
  posts: PostMeta[];
  totalPosts: number;
  totalPages: number;
}

export interface CategoryData {
  slug: string;
  name: string;
  postCount: number;
  posts: string[];
}

export interface CategoriesIndex {
  categories: CategoryData[];
}

export interface RedirectEntry {
  legacySlug: string;
  canonicalUrl: string;
}
```

## Build Scripts

### scripts/generate-metadata.ts

This script runs before the NextJS build and performs the following operations:

1. Reads all Markdown files from `content/posts/`
2. Parses frontmatter from each file without reading full content
3. Generates `generated/posts-index.json` containing an array of `PostMeta` objects sorted by date descending
4. Generates `generated/categories.json` containing category metadata and post associations
5. Generates `generated/redirects.json` mapping legacy slugs to canonical URLs

The script should validate frontmatter against the required schema and report any missing or invalid fields.

### scripts/optimise-images.ts

This script processes all images in `public/images/originals/` and generates optimised variants:

1. Reads each image file (JPEG, PNG, WebP supported)
2. Generates multiple widths: 640, 960, 1280, and 1920 pixels
3. Outputs each size in WebP format (primary) and JPEG format (fallback)
4. Maintains aspect ratio during resizing
5. Applies appropriate compression (WebP quality 80, JPEG quality 85)
6. Outputs to `public/images/optimised/[filename]/[width].[format]`

Example output structure for `hero-image.jpg`:

```
public/images/optimised/hero-image/
├── 640.webp
├── 640.jpg
├── 960.webp
├── 960.jpg
├── 1280.webp
├── 1280.jpg
├── 1920.webp
└── 1920.jpg
```

### scripts/generate-redirects.ts

This script generates a CloudFront Function for handling legacy URL redirects with true HTTP 301 responses:

1. Reads `generated/redirects.json`
2. Generates `generated/cloudfront-redirect-function.js` containing:
   - A redirect lookup object mapping legacy slugs to canonical URLs
   - A handler function that returns 301 responses for matched URLs
   - Pass-through behaviour for non-matched requests

The generated CloudFront Function:

```javascript
// generated/cloudfront-redirect-function.js
var siteUrl = 'https://example.com';
var redirects = {
  '/2024/01/old-wordpress-url': '/technology/new-post-slug/',
  '/node/123': '/category/migrated-post/'
  // ... generated from redirects.json
};

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  
  // Normalise URI for lookup (handle trailing slashes)
  var lookupUri = uri.endsWith('/') && uri.length > 1 
    ? uri.slice(0, -1) 
    : uri;
  
  if (lookupUri in redirects) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: siteUrl + redirects[lookupUri] },
        'cache-control': { value: 'max-age=31536000' }
      }
    };
  }
  
  return request;
}
```

**CloudFront Function Constraints:**

- Maximum function size: 10KB (sufficient for several hundred redirects)
- JavaScript subset: ES 5.1 with limited additions (no ES6+, no external modules)
- Execution time: Typically under 1ms

If the redirect map exceeds the 10KB limit, the script should emit a warning and suggest alternatives such as splitting redirects across multiple functions or using CloudFront Functions for high-traffic legacy URLs and a fallback 404 page with client-side redirect for the remainder.

## Core Library Functions

### src/lib/posts.ts

This module provides all post data access functions, optimized for PageSpeed performance by reading from pre-generated JSON metadata files rather than performing filesystem I/O for individual posts at runtime.

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta, PostsIndex, CategoriesIndex } from '@/types/post';
import { POSTS_DIRECTORY, GENERATED_DIRECTORY, SITE_CONFIG } from './constants';

export function getAllPostsMeta(): PostMeta[];
export function getPostsMeta(page: number): PostsIndex;
export function getAllCategories(): string[];
export function getPostsByCategory(category: string, page: number): PostsIndex;
export function generateStaticParams(): Array;
export function getPostBySlug(category: string, slug: string): Post | null;
export function getCategoriesIndex(): CategoriesIndex;
export function postExists(slug: string): boolean;
```

#### Performance-Optimized Metadata Functions

These functions read from `generated/posts-index.json`, a pre-generated file containing all post metadata. This approach ensures minimal filesystem I/O and optimal PageSpeed scores.

**`getAllPostsMeta()`**
- Returns all post metadata from the pre-generated index
- Single JSON file read, cached by Node.js
- Used for generating static params and category pages

**`getPostsMeta(page: number)`**
- Returns paginated post metadata for a specific page
- Slices in-memory array from `getAllPostsMeta()`
- Returns `PostsIndex` with posts, totalPosts, and totalPages
- Used by homepage and paginated post listings

**`getPostsByCategory(category: string, page: number)`**
- Filters posts by category and returns paginated results
- Operates on in-memory metadata from `getAllPostsMeta()`
- Returns `PostsIndex` with filtered posts, totalPosts, and totalPages

**`getAllCategories()`**
- Extracts unique categories from all post metadata
- Returns sorted array of category slugs
- Used for category navigation and static param generation

**`generateStaticParams()`**
- Returns all category/slug combinations for Next.js static generation
- Used in `[category]/[slug]/page.tsx` for build-time page generation

#### Full Content Functions

These functions read individual markdown files and are only used for rendering individual post pages at build time.

**`getPostBySlug(category: string, slug: string)`**
- Reads and parses a single markdown file from `content/posts/`
- Validates that the category matches the frontmatter
- Returns full `Post` object including parsed content
- Returns `null` if post not found or category mismatch

**`getCategoriesIndex()`**
- Reads the pre-generated `categories.json` file
- Returns `CategoriesIndex` with category metadata and post counts

**`postExists(slug: string)`**
- Checks if a markdown file exists for the given slug
- Used for validation and 404 handling

### Performance Architecture

The two-tier architecture separates metadata operations from content operations:

1. **Metadata Tier** (Homepage, listings, navigation)
   - Single JSON file read: `generated/posts-index.json`
   - No per-post filesystem operations
   - Optimal for PageSpeed metrics

2. **Content Tier** (Individual post pages)
   - Reads individual markdown files: `content/posts/{slug}.md`
   - Only occurs at build time during static generation
   - Acceptable performance impact as it's not runtime

This ensures the homepage and listing pages achieve near-perfect PageSpeed scores while maintaining the ability to serve full post content.

### src/lib/markdown.ts

```typescript
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

export async function parseMarkdown(content: string): Promise {
  const result = await remark().use(html).process(content);
  return result.toString();
}

export function parseFrontmatter(fileContent: string): { data: T; content: string } {
  const { data, content } = matter(fileContent);
  return { data: data as T, content };
}
```

## Components

### src/components/OptimisedImage.tsx

This component renders responsive images using the pre-optimised variants:

```typescript
interface OptimisedImageProps {
  src: string;          // Original filename (e.g., "hero-image.jpg")
  alt: string;
  sizes?: string;       // Responsive sizes attribute
  className?: string;
  priority?: boolean;   // If true, disables lazy loading
}
```

The component should:

1. Generate `srcSet` attributes for both WebP and JPEG formats
2. Use the `<picture>` element with `<source>` for WebP and `<img>` fallback for JPEG
3. Include `loading="lazy"` by default (unless `priority` is true)
4. Include `decoding="async"` for non-blocking decode
5. Calculate appropriate `sizes` attribute if not provided

### src/components/Pagination.tsx

Renders numbered pagination controls:

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;     // e.g., "/posts/page" or "/technology/page"
}
```

The component should:

1. Display page numbers with the current page highlighted
2. Include Previous/Next links where applicable
3. Handle edge cases (first page, last page, single page)
4. Use `<Link>` components for client-side navigation
5. Include appropriate ARIA labels for accessibility

## Page Implementation

### src/app/page.tsx

The homepage displays a welcome section with the 3 most recent blog posts:

```typescript
import { Metadata } from "next";
import Link from "next/link";
import { getPostsMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { SITE_CONFIG } from "@/lib/constants";

export default function HomePage() {
  const { posts } = getPostsMeta(1);
  const recentPosts = posts.slice(0, 3);

  return (
    
      
        
          Welcome to {SITE_CONFIG.title}
        
        
          {SITE_CONFIG.description}
        
        
          View All Posts
          Browse Categories
        
      

      
        Recent Posts
        
          {recentPosts.map((post) => (
            
          ))}
        
      
    
  );
}
```

Performance characteristics:
- Single call to `getPostsMeta(1)` reads one JSON file
- No filesystem I/O for individual posts
- Slicing to 3 posts happens in-memory
- Optimal PageSpeed scores

### src/app/[category]/[slug]/page.tsx

This dynamic route renders individual blog posts:

```typescript
import { getPostBySlug, generateStaticParams } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  // Return all category/slug combinations
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params; // Must await params
  // Return title, description, openGraph metadata
}

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params; // Must await params
  const post = await getPostBySlug(params.category, params.slug);
  if (!post) notFound();
  // Render post content
}
```

### src/app/posts/page/[page]/page.tsx

This route handles paginated post listings for pages 2 and beyond:

```typescript
export async function generateStaticParams() {
  // Return array of { page: "2" }, { page: "3" }, etc.
}
```

Page 1 is handled by `src/app/posts/page.tsx` to provide a clean `/posts/` URL.

## SEO Implementation

### Metadata

Each page should export a `generateMetadata` function returning:

- `title`: Page-specific title with site name suffix
- `description`: Page-specific description (excerpt for posts)
- `openGraph`: Title, description, type, URL, and image if applicable
- `twitter`: Card type and relevant metadata
- `alternates.canonical`: Canonical URL for the page

### Root Layout Metadata

The root layout (`src/app/layout.tsx`) should define default metadata:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
  robots: {
    index: true,
    follow: true,
  },
};
```

### Additional SEO Files

The build process should generate:

- `public/robots.txt`: Standard robots file allowing all crawlers
- `out/sitemap.xml`: Generated sitemap listing all pages and posts with lastmod dates

## Build Process

### Package Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "prebuild": "npm run generate",
    "generate": "npm run generate:metadata && npm run generate:images && npm run generate:redirects",
    "generate:metadata": "ts-node scripts/generate-metadata.ts",
    "generate:images": "ts-node scripts/optimise-images.ts",
    "generate:redirects": "ts-node scripts/generate-redirects.ts",
    "build": "next build",
    "postbuild": "npm run generate:sitemap",
    "generate:sitemap": "ts-node scripts/generate-sitemap.ts",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

### Build Order

1. `generate:metadata` — Creates posts index and category data
2. `generate:images` — Processes images (can be skipped if no new images)
3. `generate:redirects` — Creates CloudFront Function file from redirect mappings
4. `next build` — Generates static site in `out/`
5. `generate:sitemap` — Generates sitemap.xml in `out/`

The CloudFront Function file (`generated/cloudfront-redirect-function.js`) is deployed separately from the S3 content as part of the deployment process.

## Deployment

### S3 Configuration

The S3 bucket should be configured for static website hosting with:

- Index document: `index.html`
- Error document: `404.html` (copy from `out/404/index.html`)

### CloudFront Configuration

- Origin: S3 bucket (use S3 website endpoint, not REST endpoint)
- Default root object: `index.html`
- Custom error responses: Map 404 errors to `/404.html` with 404 status code
- Cache policy: Cache based on query strings disabled, headers minimal
- Compression: Enable automatic compression (gzip, brotli)

**CloudFront Function for Redirects:**

A CloudFront Function must be created and associated with the distribution to handle legacy URL redirects:

- Function name: `legacy-redirects` (or similar)
- Event type: Viewer Request
- Runtime: `cloudfront-js-1.0`
- Associated behaviour: Default (`*`)

The function executes before the request reaches S3, returning 301 responses for legacy URLs without incurring origin latency.

### Upload Process

```bash
# Sync built files to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Update CloudFront Function (if redirects have changed)
aws cloudfront update-function \
  --name legacy-redirects \
  --function-config Comment="Legacy URL redirects",Runtime=cloudfront-js-1.0 \
  --function-code fileb://generated/cloudfront-redirect-function.js \
  --if-match $(aws cloudfront describe-function --name legacy-redirects --query 'ETag' --output text)

# Publish the updated function
aws cloudfront publish-function \
  --name legacy-redirects \
  --if-match $(aws cloudfront describe-function --name legacy-redirects --query 'ETag' --output text)

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**Initial CloudFront Function Setup:**

For first-time deployment, create the function before associating it with the distribution:

```bash
# Create the function
aws cloudfront create-function \
  --name legacy-redirects \
  --function-config Comment="Legacy URL redirects",Runtime=cloudfront-js-1.0 \
  --function-code fileb://generated/cloudfront-redirect-function.js

# Publish the function
aws cloudfront publish-function \
  --name legacy-redirects \
  --if-match $(aws cloudfront describe-function --name legacy-redirects --query 'ETag' --output text)
```

After creation, associate the function with the distribution's default cache behaviour via the AWS Console or CLI.

## Development Workflow

1. Create new posts in `content/posts/` following the frontmatter schema
2. Add any new images to `public/images/originals/`
3. Run `npm run generate` to update metadata and process images
4. Run `npm run dev` to preview locally
5. Run `npm run build` to generate production build
6. Deploy `out/` directory to S3

## Accessibility Requirements

All components must meet WCAG 2.1 AA standards:

- Maintain colour contrast ratio of at least 4.5:1 for normal text
- Ensure all interactive elements are keyboard accessible
- Provide skip navigation link in header
- Use semantic HTML elements (article, nav, main, aside)
- Include alt text for all images
- Ensure focus states are visible
- Use ARIA labels where semantic HTML is insufficient

## Performance Targets

The built site should achieve the following Lighthouse scores:

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Key performance considerations:

- Total blocking time under 200ms
- Largest contentful paint under 2.5s
- Cumulative layout shift under 0.1
- First contentful paint under 1.8s

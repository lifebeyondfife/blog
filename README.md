# Life Beyond Fife

A static blog built with Next.js 16, deployed to AWS S3 + CloudFront.

## Directory Structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout and metadata
│   │   ├── page.tsx                  # Homepage
│   │   ├── not-found.tsx             # Custom 404 page
│   │   ├── globals.css               # Global styles and Tailwind imports
│   │   ├── about/
│   │   │   └── page.tsx              # Static about page
│   │   ├── categories/
│   │   │   ├── page.tsx              # All categories listing
│   │   │   └── [category]/
│   │   │       ├── page.tsx          # Category post listing
│   │   │       └── [slug]/
│   │   │           └── page.tsx      # Individual post
│   │   └── posts/
│   │       ├── page.tsx              # Paginated post listing (page 1)
│   │       └── [page]/
│   │           └── page.tsx          # Paginated post listing (page 2+)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx
│   │   ├── PostContent.tsx
│   │   ├── Pagination.tsx
│   │   ├── CategoryList.tsx
│   │   └── OptimisedImage.tsx
│   ├── lib/
│   │   ├── posts.ts                  # Post data access
│   │   ├── markdown.ts               # Markdown processing
│   │   ├── categories.ts             # Category utilities
│   │   ├── constants.ts              # Site configuration
│   │   └── rehype-optimised-images.ts  # Rehype plugin for responsive images
│   └── types/
│       ├── images.ts                 # Image manifest types
│       └── post.ts                   # Post and category types
├── content/
│   └── posts/
│       └── *.md
├── public/
│   ├── images/
│   │   ├── originals/                # Source images
│   │   └── optimised/                # Generated responsive images
│   └── favicon.ico
├── scripts/
│   ├── generate-metadata.ts          # Create post/category indices
│   ├── optimise-images.ts            # Process images
│   ├── generate-redirects.ts         # Create redirect function
│   ├── generate-sitemap.ts           # Generate sitemap.xml
│   └── generate-robots.ts            # Generate robots.txt
├── generated/                        # Build artifacts
│   ├── posts-index.json              # Post metadata for listings
│   ├── categories.json               # Category-to-post mappings
│   ├── image-manifest.json           # Image dimensions and available sizes
│   ├── redirects.json                # Legacy URL mappings
│   └── cloudfront-redirect-function.js
├── out/                              # Static build output
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Building

### Production Build

```bash
npm run build
```

This command:
1. Generates post metadata and category indices
2. Optimises images to multiple sizes and formats
3. Creates redirect mappings for legacy URLs
4. Builds the static site to `out/`
5. Generates the sitemap

### Serve Locally

After building, serve the static site:

```bash
npx serve out
```

Visit [http://localhost:3000](http://localhost:3000) to view the production build.

## Adding Content

### Adding a New Post

1. Create a new Markdown file in `content/posts/`:

```bash
touch content/posts/my-new-post.md
```

2. Add frontmatter and content:

```markdown
---
title: My New Post
date: 2024-12-07
category: essays
tags: [writing, blogging]
excerpt: A brief description of this post.
---

Your post content here...
```

**Required frontmatter fields:**
- `title`: Post title
- `date`: Publication date (YYYY-MM-DD format)
- `category`: Category slug (e.g., essays, coding, fitness)
- `tags`: Array of tags
- `excerpt`: Brief description (auto-generated if omitted)

**Optional frontmatter fields:**
- `legacySlug`: Old URL path for redirects (e.g., `/2024/01/old-url`)
- `featuredImage`: Path to image (e.g., `/images/originals/hero.jpg`)

3. The filename becomes the URL slug:
   - File: `my-new-post.md`
   - URL: `/essays/my-new-post/`

### Adding Images

1. Place original images in `public/images/originals/`:

```bash
cp ~/Downloads/hero.jpg public/images/originals/
```

2. Reference in Markdown (note: use `/images/` not `/images/originals/`):

```markdown
![Alt text](/images/hero.jpg)
```

3. Images are automatically optimised during build to:
   - Multiple widths: 640px, 960px, 1280px, 1920px
   - WebP format (primary) + JPEG fallback
   - Output: `public/images/optimised/hero/[width].[format]`

## Deployment

The site deploys to AWS S3 + CloudFront as a static site. The `out/` directory contains the complete static build.

Deploy the CloudFront Function separately using the generated file at `generated/cloudfront-redirect-function.js`.

## Configuration

Key configuration files:

- `src/lib/constants.ts` — Site metadata, URLs, and constants
- `next.config.mjs` — Next.js configuration
- `tailwind.config.ts` — Tailwind CSS configuration

# Post Metadata Build Process

This document explains the metadata build process that was added to improve performance and enable lazy loading for the blog.

## Overview

The build process scans all Markdown files in the `src/posts` directory, extracts their metadata (title, date, categories, tags, etc.), and saves this information to a JSON file. This allows the application to load just the metadata initially, rather than loading all post content at once, significantly improving performance.

## How It Works

1. **Build Script**: The `scripts/build-metadata.js` script runs before webpack and:
   - Reads all Markdown files in `src/posts/`
   - Extracts front matter metadata
   - Creates a JSON file with all post metadata
   - Includes category and tag information with counts

2. **Data Storage**: The metadata is saved to `src/data/posts-metadata.json`

3. **Lazy Loading**: The client-side code:
   - Initially loads only the metadata JSON file
   - Loads actual post content only when a user navigates to a specific post
   - Uses the metadata for pagination, category lists, and tag clouds without loading full content

## Benefits

1. **Faster Initial Load**: The site loads much faster since it only needs to fetch a small JSON file instead of all post content.

2. **Improved Pagination**: Pagination works with pre-calculated metadata, making page navigation much quicker.

3. **Better Category and Tag Pages**: Category and tag pages can be generated instantly using the metadata.

4. **Reduced Memory Usage**: The browser uses less memory because it only loads the content for posts that are actually being viewed.

5. **Better Development Experience**: The build process ensures consistency between the development environment and production.

## Usage

1. **Adding New Posts**: Simply add new Markdown files to the `src/posts` directory, and the metadata will be automatically generated on the next build.

2. **Running the Build**: The build process is integrated into the npm scripts:
   ```bash
   # Development (includes metadata build + webpack dev server)
   npm start

   # Production build (includes metadata build + production webpack build)
   npm run build

   # Just build the metadata
   npm run build:metadata
   ```

3. **Editing Existing Posts**: When you edit a post's metadata (title, categories, tags, etc.), simply run the build process again to update the metadata file.

## Technical Details

The metadata JSON file has the following structure:

```json
{
  "posts": [
    {
      "id": 1,
      "slug": "post-slug",
      "title": "Post Title",
      "date": "2023-01-01",
      "categories": ["Category1", "Category2"],
      "tags": ["tag1", "tag2"],
      "excerpt": "First 150 characters of the post...",
      "fileName": "post-file-name.md"
    },
    // More posts...
  ],
  "categories": [
    {
      "name": "Category1",
      "count": 5,
      "slug": "category1"
    },
    // More categories...
  ],
  "tags": [
    {
      "name": "tag1",
      "count": 3,
      "slug": "tag1"
    },
    // More tags...
  ],
  "lastUpdated": "2023-03-15T12:34:56.789Z"
}
```

## Fallback Mechanism

The system includes a fallback mechanism that will revert to the original method of loading posts directly if the metadata file is not available. This ensures backward compatibility and robustness.
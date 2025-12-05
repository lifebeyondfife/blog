import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostMeta, PostFrontmatter } from '@/types/post';
import { SITE_CONFIG, POSTS_DIRECTORY, READING_TIME_CONFIG, EXCERPT_WORD_COUNT } from '@/lib/constants';

interface CategoryData {
  slug: string;
  name: string;
  postCount: number;
  posts: string[];
}

interface CategoriesIndex {
  categories: CategoryData[];
}

interface RedirectEntry {
  legacySlug: string;
  canonicalUrl: string;
}

const CONTENT_DIR = path.join(process.cwd(), POSTS_DIRECTORY);
const GENERATED_DIR = path.join(process.cwd(), 'generated');

function ensureGeneratedDir(): void {
  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }
}

function calculateReadingTime(content: string): number {
  const { wordsPerMinute } = READING_TIME_CONFIG;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function validateFrontmatter(frontmatter: any, filename: string): void {
  const required = ['title', 'date', 'category'];
  const missing = required.filter(field => !frontmatter[field]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required fields in ${filename}: ${missing.join(', ')}`
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.date)) {
    throw new Error(
      `Invalid date format in ${filename}. Expected YYYY-MM-DD, got ${frontmatter.date}`
    );
  }

  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    throw new Error(
      `Tags must be an array in ${filename}`
    );
  }
}

function capitalizeCategory(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractFirstInternalImage(content: string): string | null {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const imageSrc = match[2].trim();
    
    if (imageSrc.startsWith('/images/')) {
      return imageSrc;
    }
  }
  
  return null;
}

function generateExcerpt(content: string, frontmatterExcerpt?: string): string {
  if (frontmatterExcerpt) {
    return frontmatterExcerpt;
  }

  const plainText = content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '')
    .replace(/#+\s/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();

  const words = plainText.split(/\s+/).slice(0, EXCERPT_WORD_COUNT);
  return words.join(' ') + (words.length === EXCERPT_WORD_COUNT ? '...' : '');
}

function processMarkdownFiles(): PostMeta[] {
  const posts: PostMeta[] = [];
  const files = fs.readdirSync(CONTENT_DIR);

  for (const filename of files) {
    if (!filename.endsWith('.md')) {
      continue;
    }

    const filepath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const { data, content } = matter(fileContent);

    try {
      validateFrontmatter(data, filename);
    } catch (error) {
      console.error(`Validation error: ${error}`);
      process.exit(1);
    }

    const slug = filename.replace(/\.md$/, '');
    const frontmatter = data as PostFrontmatter;
    
    const featuredImage = frontmatter.featuredImage || extractFirstInternalImage(content);
    
    const postMeta: PostMeta = {
      slug,
      category: frontmatter.category,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: generateExcerpt(content, frontmatter.excerpt),
      tags: frontmatter.tags || [],
      readingTime: calculateReadingTime(content),
      ...(featuredImage && { featuredImage }),
    };

    posts.push(postMeta);
  }

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function generateCategoriesIndex(posts: PostMeta[]): CategoriesIndex {
  const categoryMap = new Map<string, { posts: string[], count: number }>();

  for (const post of posts) {
    const category = post.category;
    if (!categoryMap.has(category)) {
      categoryMap.set(category, { posts: [], count: 0 });
    }
    const categoryData = categoryMap.get(category)!;
    categoryData.posts.push(post.slug);
    categoryData.count++;
  }

  const categories: CategoryData[] = Array.from(categoryMap.entries())
    .map(([slug, data]) => ({
      slug,
      name: capitalizeCategory(slug),
      postCount: data.count,
      posts: data.posts,
    }))
    .sort((a, b) => b.postCount - a.postCount);

  return { categories };
}

function generateRedirects(posts: PostMeta[]): RedirectEntry[] {
  const redirects: RedirectEntry[] = [];

  for (const post of posts) {
    const canonicalUrl = `${SITE_CONFIG.siteUrl}/${post.category}/${post.slug}/`;
    
    const postFile = fs.readFileSync(
      path.join(CONTENT_DIR, `${post.slug}.md`),
      'utf-8'
    );
    const { data } = matter(postFile);
    
    if (data.legacySlug) {
      redirects.push({
        legacySlug: data.legacySlug,
        canonicalUrl,
      });
    }
  }

  return redirects;
}

function main(): void {
  console.log('Starting metadata generation...');

  ensureGeneratedDir();

  console.log('Processing markdown files...');
  const posts = processMarkdownFiles();
  console.log(`Processed ${posts.length} posts`);

  console.log('Generating posts-index.json...');
  const postsIndexPath = path.join(GENERATED_DIR, 'posts-index.json');
  fs.writeFileSync(
    postsIndexPath,
    JSON.stringify({ posts, totalPosts: posts.length }, null, 2)
  );
  console.log(`✓ Generated ${postsIndexPath}`);

  console.log('Generating categories.json...');
  const categoriesIndex = generateCategoriesIndex(posts);
  const categoriesPath = path.join(GENERATED_DIR, 'categories.json');
  fs.writeFileSync(
    categoriesPath,
    JSON.stringify(categoriesIndex, null, 2)
  );
  console.log(`✓ Generated ${categoriesPath} (${categoriesIndex.categories.length} categories)`);

  console.log('Generating redirects.json...');
  const redirects = generateRedirects(posts);
  const redirectsPath = path.join(GENERATED_DIR, 'redirects.json');
  fs.writeFileSync(
    redirectsPath,
    JSON.stringify(redirects, null, 2)
  );
  console.log(`✓ Generated ${redirectsPath} (${redirects.length} redirects)`);

  console.log('\nMetadata generation complete!');
}

main();

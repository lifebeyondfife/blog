import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './markdown';
import { Post, PostMeta, PostsIndex, CategoriesIndex } from '@/types/post';
import { POSTS_DIRECTORY, GENERATED_DIRECTORY, SITE_CONFIG } from './constants';
import postsIndexData from '../../generated/posts-index.json';

const CONTENT_DIR = path.join(process.cwd(), POSTS_DIRECTORY);
const GENERATED_DIR = path.join(process.cwd(), GENERATED_DIRECTORY);

export function getAllPostsMeta(): PostMeta[] {
  return postsIndexData.posts;
}

export function getPostsMeta(page: number): PostsIndex {
  const allPosts = getAllPostsMeta();
  const { postsPerPage } = SITE_CONFIG;
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + postsPerPage);
  
  return {
    posts: paginatedPosts,
    totalPosts: allPosts.length,
    totalPages: Math.ceil(allPosts.length / postsPerPage),
  };
}

export function getAllCategories(): string[] {
  const allPosts = getAllPostsMeta();
  const categories = new Set(allPosts.map(post => post.category));
  return Array.from(categories).sort();
}

export function getPostsByCategory(category: string, page: number): PostsIndex {
  const allPosts = getAllPostsMeta();
  const categoryPosts = allPosts.filter(post => post.category === category);
  const chronologicalPosts = [...categoryPosts].reverse();
  
  const { postsPerPage } = SITE_CONFIG;
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = chronologicalPosts.slice(startIndex, startIndex + postsPerPage);
  
  return {
    posts: paginatedPosts,
    totalPosts: chronologicalPosts.length,
    totalPages: Math.ceil(chronologicalPosts.length / postsPerPage),
  };
}

export function generateStaticParams(): Array<{ category: string; slug: string }> {
  const allPosts = getAllPostsMeta();
  return allPosts.map(post => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function getPostBySlug(category: string, slug: string): Promise<Post | null> {
  try {
    const postMeta = postsIndexData.posts.find(
      (p) => p.slug === slug && p.category === category
    );

    if (!postMeta) {
      return null;
    }

    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    if (data.category !== category) {
      return null;
    }

    const htmlContent = await markdownToHtml(content);

    return {
      ...postMeta,
      content: htmlContent,
    };
  } catch (error) {
    console.error(`Error loading post ${category}/${slug}:`, error);
    return null;
  }
}

export function getCategoriesIndex(): CategoriesIndex {
  const categoriesPath = path.join(GENERATED_DIR, 'categories.json');
  const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');
  return JSON.parse(categoriesContent);
}

export function postExists(slug: string): boolean {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  return fs.existsSync(filePath);
}

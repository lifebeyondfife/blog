import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta, PostsIndex, CategoriesIndex } from '@/types/post';
import { POSTS_DIRECTORY, GENERATED_DIRECTORY } from './constants';

const CONTENT_DIR = path.join(process.cwd(), POSTS_DIRECTORY);
const GENERATED_DIR = path.join(process.cwd(), GENERATED_DIRECTORY);

export function getPostBySlug(slug: string): Post | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      category: data.category,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      readingTime: data.readingTime || 0,
      ...(data.featuredImage && { featuredImage: data.featuredImage }),
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getPostsIndex(): PostsIndex {
  const indexPath = path.join(GENERATED_DIR, 'posts-index.json');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  return JSON.parse(indexContent);
}

export function getCategoriesIndex(): CategoriesIndex {
  const categoriesPath = path.join(GENERATED_DIR, 'categories.json');
  const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');
  return JSON.parse(categoriesContent);
}

export function getPostsByCategory(category: string): PostMeta[] {
  const { posts } = getPostsIndex();
  return posts.filter(post => post.category === category);
}

export function getPaginatedPosts(
  page: number,
  postsPerPage: number,
  category?: string
): {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
} {
  let allPosts = getPostsIndex().posts;
  
  if (category) {
    allPosts = allPosts.filter(post => post.category === category);
  }

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    currentPage: page,
    totalPages,
    totalPosts,
  };
}

export function postExists(slug: string): boolean {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  return fs.existsSync(filePath);
}

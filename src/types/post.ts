export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  legacySlug?: string;
  featuredImage?: string;
}

export interface PostMeta {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  featuredImage?: string;
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

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
  totalReadingTime: number;
}

export interface RelatedPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export interface TagWithCount {
  tag: string;
  count: number;
}

export interface CategoryWithCount {
  category: string;
  count: number;
}

export interface SearchResult {
  post: PostMeta;
  score: number;
  matches: {
    title?: boolean;
    excerpt?: boolean;
    tags?: boolean;
  };
}

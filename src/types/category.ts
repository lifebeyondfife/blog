export interface CategoryData {
  slug: string;
  name: string;
  postCount: number;
  posts: string[];
}

export interface CategoriesIndex {
  categories: CategoryData[];
}

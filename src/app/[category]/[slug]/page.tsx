import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';
import { SITE_CONFIG } from '@/lib/constants';
import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  const categories = getAllCategories();
  
  console.log(`Generating static params for ${categories.length} categories`);
  
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${categoryName} - ${SITE_CONFIG.title}`,
    description: `Browse all posts in the ${categoryName} category`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const page = 1;
  
  const { posts, totalPosts, totalPages } = getPostsByCategory(category, page);

  if (posts.length === 0) {
    notFound();
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
        </p>
      </header>

      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/${category}/page`}
          />
        </div>
      )}
    </div>
  );
}

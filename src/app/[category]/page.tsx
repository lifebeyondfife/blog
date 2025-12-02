import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category,
  }));
}

function formatCategoryTitle(categorySlug: string): string {
  return categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryTitle = formatCategoryTitle(category);

  return {
    title: `${categoryTitle} Posts`,
    description: `Browse all ${categoryTitle.toLowerCase()} posts on ${SITE_CONFIG.title}`,
    openGraph: {
      title: `${categoryTitle} Posts | ${SITE_CONFIG.title}`,
      description: `Browse all ${categoryTitle.toLowerCase()} posts on ${SITE_CONFIG.title}`,
      type: "website",
      url: `${SITE_CONFIG.siteUrl}/${category}/`,
    },
    alternates: {
      canonical: `/${category}/`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  const allCategories = getAllCategories();
  const categoryExists = allCategories.includes(category);
  
  if (!categoryExists) {
    notFound();
  }

  const firstPageNumber = 1;
  const { posts, totalPages } = getPostsByCategory(category, firstPageNumber);

  const categoryTitle = formatCategoryTitle(category);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {categoryTitle}
          </h1>
          <p className="text-xl text-gray-600">
            Explore articles about {categoryTitle.toLowerCase()} on {SITE_CONFIG.title}
          </p>
        </header>

        {posts.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {posts.map((post) => (
                <PostCard key={`${post.category}-${post.slug}`} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={1}
                totalPages={totalPages}
                basePath={`/${category}/page`}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No posts available in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

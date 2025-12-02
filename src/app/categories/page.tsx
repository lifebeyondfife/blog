import { Metadata } from "next";
import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Categories",
  description: `Browse all post categories on ${SITE_CONFIG.title}`,
  openGraph: {
    title: `Categories | ${SITE_CONFIG.title}`,
    description: `Browse all post categories on ${SITE_CONFIG.title}`,
    type: "website",
    url: `${SITE_CONFIG.siteUrl}/categories/`,
  },
  alternates: {
    canonical: "/categories/",
  },
};

function formatCategoryTitle(categorySlug: string): string {
  return categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CategoriesPage() {
  const categories = getAllCategories();
  
  const categoriesWithCounts = categories.map(category => {
    const firstPageNumber = 1;
    const { totalPosts } = getPostsByCategory(category, firstPageNumber);
    return {
      slug: category,
      title: formatCategoryTitle(category),
      postCount: totalPosts,
    };
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Categories
          </h1>
          <p className="text-xl text-gray-600">
            Browse posts by category on {SITE_CONFIG.title}
          </p>
        </header>

        {categoriesWithCounts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {categoriesWithCounts.map(({ slug, title, postCount }) => (
              <Link
                key={slug}
                href={`/${slug}/`}
                className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {title}
                  </h2>
                  <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                    {postCount} {postCount === 1 ? 'post' : 'posts'}
                  </span>
                </div>
                <p className="text-gray-600">
                  View all {title.toLowerCase()} articles
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No categories available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import { PostsGrid } from "@/components/PostsGrid";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ category: string; page: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const params: Array<{ category: string; page: string }> = [];

  for (const category of categories) {
    const firstPageNumber = 1;
    const { totalPages } = getPostsByCategory(category, firstPageNumber);
    
    const subsequentPageStart = 2;
    for (let page = subsequentPageStart; page <= totalPages; page++) {
      params.push({
        category,
        page: page.toString(),
      });
    }
  }

  return params;
}

function formatCategoryTitle(categorySlug: string): string {
  return categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, page } = await params;
  const pageNum = parseInt(page, 10);

  const isInvalidPage = isNaN(pageNum) || pageNum < 1;
  if (isInvalidPage) {
    return {
      title: "Page Not Found",
    };
  }

  const categoryTitle = formatCategoryTitle(category);

  return {
    title: `${categoryTitle} Posts - Page ${pageNum}`,
    description: `Browse ${categoryTitle.toLowerCase()} posts on ${SITE_CONFIG.title} - Page ${pageNum}`,
    openGraph: {
      title: `${categoryTitle} Posts - Page ${pageNum} | ${SITE_CONFIG.title}`,
      description: `Browse ${categoryTitle.toLowerCase()} posts on ${SITE_CONFIG.title} - Page ${pageNum}`,
      type: "website",
      url: `${SITE_CONFIG.siteUrl}/${category}/page/${pageNum}/`,
    },
    alternates: {
      canonical: `/${category}/page/${pageNum}/`,
    },
  };
}

export default async function CategoryPagePaginated({ params }: PageProps) {
  const { category, page } = await params;
  const pageNum = parseInt(page, 10);

  const isInvalidPage = isNaN(pageNum) || pageNum < 1;
  if (isInvalidPage) {
    notFound();
  }

  const allCategories = getAllCategories();
  const categoryExists = allCategories.includes(category);
  
  if (!categoryExists) {
    notFound();
  }

  const isFirstPage = pageNum === 1;
  if (isFirstPage) {
    notFound();
  }

  const { posts, totalPages } = getPostsByCategory(category, pageNum);

  const pageExceedsTotalPages = pageNum > totalPages;
  if (pageExceedsTotalPages) {
    notFound();
  }

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
          <p className="text-sm text-gray-500 mt-2">
            Page {pageNum} of {totalPages}
          </p>
        </header>

        <PostsGrid
          posts={posts}
          currentPage={pageNum}
          totalPages={totalPages}
          basePath={`/${category}/page`}
          emptyMessage="No posts available on this page."
        />
      </div>
    </div>
  );
}

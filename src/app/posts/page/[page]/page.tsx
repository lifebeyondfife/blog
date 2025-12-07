import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsMeta } from "@/lib/posts";
import { PostsGrid } from "@/components/PostsGrid";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const { totalPages } = getPostsMeta(1);

  // Generate params for pages 2 and beyond (page 1 is handled by /posts/)
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const pageNumber = parseInt(pageParam, 10);

  if (isNaN(pageNumber) || pageNumber < 2) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `All Posts - Page ${pageNumber}`,
    description: `Browse all blog posts on ${SITE_CONFIG.title} - Page ${pageNumber}`,
    openGraph: {
      title: `All Posts - Page ${pageNumber} | ${SITE_CONFIG.title}`,
      description: `Browse all blog posts on ${SITE_CONFIG.title}`,
      type: "website",
      url: `${SITE_CONFIG.siteUrl}/posts/page/${pageNumber}/`,
    },
    alternates: {
      canonical: `/posts/page/${pageNumber}/`,
    },
  };
}

export default async function PaginatedPostsPage({ params }: PageProps) {
  const { page: pageParam } = await params;
  const pageNumber = parseInt(pageParam, 10);

  if (isNaN(pageNumber) || pageNumber < 2) {
    notFound();
  }

  const { posts, totalPages } = getPostsMeta(pageNumber);

  if (pageNumber > totalPages) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Posts
          </h1>
          <p className="text-xl text-gray-600">
            Explore all articles from {SITE_CONFIG.title} - Page {pageNumber}
          </p>
        </header>

        <PostsGrid
          posts={posts}
          currentPage={pageNumber}
          totalPages={totalPages}
          basePath="/posts/page"
          emptyMessage="No posts found for this page."
        />
      </div>
    </div>
  );
}

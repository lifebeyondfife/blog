import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
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

        {posts.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {posts.map((post) => (
                <PostCard key={`${post.category}-${post.slug}`} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={pageNumber}
              totalPages={totalPages}
              basePath="/posts/page"
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No posts found for this page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

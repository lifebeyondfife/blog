import { Metadata } from "next";
import { getPostsMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Posts",
  description: `Browse all blog posts on ${SITE_CONFIG.title}`,
  openGraph: {
    title: `All Posts | ${SITE_CONFIG.title}`,
    description: `Browse all blog posts on ${SITE_CONFIG.title}`,
    type: "website",
    url: `${SITE_CONFIG.siteUrl}/posts/`,
  },
  alternates: {
    canonical: "/posts/",
  },
};

export default function PostsPage() {
  const { posts, totalPages } = getPostsMeta(1);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Posts
          </h1>
          <p className="text-xl text-gray-600">
            Explore all articles from {SITE_CONFIG.title}
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
                basePath="/posts/page"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No posts available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

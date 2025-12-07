import { Metadata } from "next";
import { getPostsMeta } from "@/lib/posts";
import { PostsGrid } from "@/components/PostsGrid";
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

        <PostsGrid
          posts={posts}
          currentPage={1}
          totalPages={totalPages}
          basePath="/posts/page"
          emptyMessage="No posts available yet. Check back soon!"
        />
      </div>
    </div>
  );
}

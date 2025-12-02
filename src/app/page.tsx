import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPostsMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Home",
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
    url: SITE_CONFIG.siteUrl,
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const { posts } = getPostsMeta(1);
  const recentPosts = posts.slice(0, SITE_CONFIG.postsPerPage);

  return (
    <div className="relative">
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/og-image.jpg"
            alt="Life Beyond Fife"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/60 via-ocean-blue/40 to-white" />
        </div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-8 drop-shadow-md">
              {SITE_CONFIG.byline}
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/posts"
                className="inline-block bg-white text-ocean-dark px-8 py-3 rounded-lg font-medium hover:bg-cloud-grey hover:text-ocean-dark transition-colors shadow-lg"
              >
                View All Posts
              </Link>
              <Link
                href="/categories"
                className="inline-block bg-ocean-blue/20 backdrop-blur-sm text-white border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-ocean-blue transition-colors shadow-lg"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-16">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-horizon/30 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            <Link
              href="/posts"
              className="text-ocean-dark hover:text-ocean-blue hover:underline font-medium transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={`${post.category}-${post.slug}`} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-gray-600 py-12">
              No posts available yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

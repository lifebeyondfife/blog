import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, generateStaticParams as getStaticParams } from "@/lib/posts";
import { OptimisedImage } from "@/components/OptimisedImage";
import PostContent from "@/components/PostContent";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | ${SITE_CONFIG.title}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [SITE_CONFIG.author],
      tags: post.tags,
      url: `${SITE_CONFIG.siteUrl}/${post.category}/${post.slug}/`,
      ...(post.featuredImage && {
        images: [{
          url: `${SITE_CONFIG.siteUrl}${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }],
      }),
    },
    alternates: {
      canonical: `/${post.category}/${post.slug}/`,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-ocean-blue transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link 
                href={`/${post.category}`} 
                className="hover:text-ocean-blue transition-colors capitalize"
              >
                {post.category}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-gray-900 font-medium" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
            <span>•</span>
            <span className="capitalize">{post.category}</span>
          </div>
        </header>

        <PostContent html={post.content} />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-ocean-blue hover:text-white transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/${post.category}`}
            className="inline-flex items-center text-ocean-dark hover:text-ocean-blue font-medium transition-colors"
          >
            ← Back to {post.category} posts
          </Link>
        </div>
      </div>
    </article>
  );
}

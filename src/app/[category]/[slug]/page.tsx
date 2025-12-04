import { getPostBySlug, generateStaticParams as getStaticParams } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import PostContent from '@/components/PostContent';

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
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${SITE_CONFIG.siteUrl}/${category}/${slug}/`,
      publishedTime: post.date,
    },
    alternates: {
      canonical: `/${category}/${slug}/`,
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
      </div>
    </article>
  );
}

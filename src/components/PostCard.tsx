import Link from "next/link";
import { PostMeta } from "@/types/post";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const postUrl = `/${post.category}/${post.slug}`;
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={postUrl} className="block">
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span className="font-medium text-ocean-dark">{post.category}</span>
            <span>•</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-GB', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-ocean-blue transition-colors">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{post.readingTime} min read</span>
            <span className="text-ocean-dark font-medium">Read more →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

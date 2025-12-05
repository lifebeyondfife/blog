import Link from "next/link";
import { PostMeta } from "@/types/post";
import { OptimisedImage } from "@/components/OptimisedImage";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const postUrl = `/${post.category}/${post.slug}`;
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={postUrl} className="block">
        {post.featuredImage && (
          <div className="aspect-video overflow-hidden bg-gray-100">
            <OptimisedImage
              src={post.featuredImage}
              alt={post.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
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

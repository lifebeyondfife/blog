import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";
import { PostMeta } from "@/types/post";

interface PostsGridProps {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
  basePath: string;
  emptyMessage?: string;
}

export function PostsGrid({
  posts,
  currentPage,
  totalPages,
  basePath,
  emptyMessage = "No posts available yet. Check back soon!",
}: PostsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {posts.map((post) => (
          <PostCard key={`${post.category}-${post.slug}`} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={basePath}
        />
      )}
    </>
  );
}

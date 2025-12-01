interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g., "/posts/page" or "/technology/page"
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // TODO: Implement pagination logic and UI
  return (
    <nav aria-label="Pagination" className="flex justify-center">
      <div className="text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}

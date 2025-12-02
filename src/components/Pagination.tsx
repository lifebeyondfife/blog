'use client';

import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  onPageChange,
  maxVisiblePages = 7
}) => {
  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}/${page}`;
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const leftSiblingIndex = Math.max(currentPage - 1, 2);
      const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 1);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        for (let i = 2; i <= Math.min(maxVisiblePages - 2, totalPages - 1); i++) {
          pages.push(i);
        }
        pages.push('...');
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        pages.push('...');
        for (let i = Math.max(totalPages - maxVisiblePages + 3, 2); i <= totalPages - 1; i++) {
          pages.push(i);
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        pages.push('...');
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Pagination navigation" className="flex items-center justify-center gap-1">
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Go to previous page"
          className="px-3 py-2 rounded-md font-medium transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
        >
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="px-3 py-2 rounded-md font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
        >
          Previous
        </span>
      )}

      <div className="flex items-center gap-1 mx-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          if (isActive) {
            return (
              <span
                key={pageNumber}
                aria-label={`Page ${pageNumber}`}
                aria-current="page"
                className="min-w-[40px] px-3 py-2 rounded-md font-medium bg-blue-600 text-white"
              >
                {pageNumber}
              </span>
            );
          }

          return (
            <Link
              key={pageNumber}
              href={getPageUrl(pageNumber)}
              onClick={() => handlePageChange(pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              className="min-w-[40px] px-3 py-2 rounded-md font-medium transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Go to next page"
          className="px-3 py-2 rounded-md font-medium transition-colors bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
        >
          Next
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="px-3 py-2 rounded-md font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
        >
          Next
        </span>
      )}
    </nav>
  );
};

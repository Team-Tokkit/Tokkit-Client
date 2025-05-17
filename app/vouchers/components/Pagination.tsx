"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i)

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className="text-gray-400 disabled:opacity-50"
      >
        <ChevronsLeft />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="text-gray-400 disabled:opacity-50"
      >
        <ChevronLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
            currentPage === page
              ? "bg-gray-300 font-bold"
              : "hover:bg-gray-100 text-gray-800"
          }`}
        >
          {page + 1} {/* 보여줄 숫자는 1부터 */}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="text-gray-400 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className="text-gray-400 disabled:opacity-50"
      >
        <ChevronsRight />
      </button>
    </div>
  )
}

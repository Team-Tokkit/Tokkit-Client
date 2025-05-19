"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const [jumpToPage, setJumpToPage] = useState("")
  const [showJumpInput, setShowJumpInput] = useState(false)

  // 항상 최대 5개의 페이지 번호만 표시
  const getVisiblePages = () => {
    // 총 페이지가 5개 이하면 모두 표시
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i)
    }

    // 현재 페이지 주변 페이지 계산
    let startPage = Math.max(0, currentPage - 1)
    let endPage = Math.min(totalPages - 1, currentPage + 1)

    // 표시할 페이지 수가 3개 미만이면 조정
    const visibleCount = endPage - startPage + 1
    if (visibleCount < 3) {
      if (startPage === 0) {
        endPage = Math.min(totalPages - 1, 2)
      } else if (endPage === totalPages - 1) {
        startPage = Math.max(0, totalPages - 3)
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const visiblePages = getVisiblePages()

  // 큰 숫자를 간결하게 표시 (예: 1000 -> 1K)
  const formatPageNumber = (pageNum: number) => {
    const num = pageNum + 1 // 0-based to 1-based
    if (num < 1000) return num.toString()
    if (num < 10000) return `${(num / 1000).toFixed(1)}K`
    if (num < 1000000) return `${Math.floor(num / 1000)}K`
    return `${(num / 1000000).toFixed(1)}M`
  }

  const handleJumpToPage = () => {
    const pageNum = Number.parseInt(jumpToPage, 10)
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum - 1) // Convert from 1-based to 0-based
    }
    setJumpToPage("")
    setShowJumpInput(false)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 disabled:text-gray-300 hover:bg-gray-100 disabled:hover:bg-transparent transition-colors"
          aria-label="첫 페이지로"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 disabled:text-gray-300 hover:bg-gray-100 disabled:hover:bg-transparent transition-colors"
          aria-label="이전 페이지로"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center">
          {/* 첫 페이지 */}
          {visiblePages[0] > 0 && (
            <>
              <button
                onClick={() => onPageChange(0)}
                className="min-w-8 h-8 px-2 text-sm flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {formatPageNumber(0)}
              </button>
              {visiblePages[0] > 1 && (
                <button
                  onClick={() => setShowJumpInput(true)}
                  className="w-8 h-8 text-sm flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-md transition-colors"
                >
                  …
                </button>
              )}
            </>
          )}

          {/* 가운데 페이지들 */}
          {visiblePages.map((page) => (
            <motion.button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-8 h-8 px-2 text-sm flex items-center justify-center rounded-md transition-all ${
                currentPage === page ? "bg-gray-200 text-gray-800 font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {formatPageNumber(page)}
            </motion.button>
          ))}

          {/* 마지막 페이지 */}
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 2 && (
                <button
                  onClick={() => setShowJumpInput(true)}
                  className="w-8 h-8 text-sm flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-md transition-colors"
                >
                  …
                </button>
              )}
              <button
                onClick={() => onPageChange(totalPages - 1)}
                className="min-w-8 h-8 px-2 text-sm flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {formatPageNumber(totalPages - 1)}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 disabled:text-gray-300 hover:bg-gray-100 disabled:hover:bg-transparent transition-colors"
          aria-label="다음 페이지로"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 disabled:text-gray-300 hover:bg-gray-100 disabled:hover:bg-transparent transition-colors"
          aria-label="마지막 페이지로"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      {/* 페이지 점프 입력 필드 */}
      {showJumpInput && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2 mt-2"
        >
          <input
            type="text"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJumpToPage()}
            placeholder={`1-${formatPageNumber(totalPages - 1)}`}
            className="w-20 h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            autoFocus
          />
          <button
            onClick={handleJumpToPage}
            className="h-8 px-2 text-xs bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            이동
          </button>
          <button
            onClick={() => setShowJumpInput(false)}
            className="h-8 px-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            취소
          </button>
        </motion.div>
      )}
    </div>
  )
}

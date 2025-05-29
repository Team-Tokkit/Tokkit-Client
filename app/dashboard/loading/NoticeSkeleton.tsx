"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NoticesSkeleton() {
  const router = useRouter()

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-medium text-[#111827] flex items-center">
          <span className="bg-gradient-to-r from-[#F43F5E] to-[#D1365A] w-1 h-4 rounded-full mr-2 inline-block"></span>
          공지사항
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[#6B7280] p-0 h-auto"
          onClick={() => router.push("/notice")}
        >
          전체보기 <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5">
          {/* 제목 라인 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 bg-gray-200 rounded-full mr-2 animate-pulse" />
              <div className="h-5 w-40 bg-gray-200 rounded-md animate-pulse" />
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
          </div>

          {/* 내용 라인 */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>

        {/* 하단 슬라이드 점 */}
        <div className="flex justify-center p-3 gap-2">
          <div className="w-3 h-2 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

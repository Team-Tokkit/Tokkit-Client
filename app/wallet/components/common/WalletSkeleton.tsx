"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, ChevronRight, Info } from "lucide-react"

export default function WalletSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white">
        {/* components/common/Header.tsx와 동일하게 직접 구현 */}
        <div className="pr-4 py-4 ml-4 flex items-center">
          <button
            type="button"
            className="mr-2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back()
              }
            }}
            data-testid="back-button"
          >
            <ArrowLeft className="h-5 w-5 text-[#1A1A1A]" />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">전자지갑</h1>
        </div>

        {/* Wallet Card Skeleton */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-[#FFB020] to-[#FF9500] rounded-2xl p-6 text-white relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

            {/* User Info Skeleton */}
            <div className="flex items-center mb-6">
              <Skeleton className="h-10 w-10 rounded-lg bg-white/20 animate-pulse" />
              <div className="ml-3">
                <Skeleton className="h-4 w-24 mb-1 bg-white/30 animate-pulse" />
                <Skeleton className="h-3 w-32 bg-white/20 animate-pulse" />
              </div>
            </div>

            {/* Balance Cards Skeleton */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]" />
                <div className="flex items-center mb-2">
                  <Skeleton className="h-4 w-4 rounded bg-white/30 animate-pulse" />
                  <Skeleton className="h-3 w-12 ml-2 bg-white/30 animate-pulse" />
                </div>
                <Skeleton className="h-6 w-20 bg-white/40 animate-pulse" />
              </div>
              <div className="bg-white/10 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite_0.5s]" />
                <div className="flex items-center mb-2">
                  <Skeleton className="h-4 w-4 rounded bg-white/30 animate-pulse" />
                  <Skeleton className="h-3 w-12 ml-2 bg-white/30 animate-pulse" />
                </div>
                <Skeleton className="h-6 w-24 bg-white/40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Convert Buttons Skeleton */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {/* 예금 → 토큰 버튼 */}
            <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              <div className="flex items-center space-x-2 relative z-10">
                <Skeleton className="h-3 w-8 animate-pulse" />
                <Skeleton className="h-3 w-3 animate-pulse" />
                <Skeleton className="h-3 w-8 animate-pulse" />
              </div>
            </div>

            {/* 토큰 → 예금 버튼 */}
            <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite_0.3s]" />
              <div className="flex items-center space-x-2 relative z-10">
                <Skeleton className="h-3 w-8 animate-pulse" />
                <Skeleton className="h-3 w-3 animate-pulse" />
                <Skeleton className="h-3 w-8 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions Skeleton */}
        <div className="px-4">
        {/* 타이틀과 전체 거래내역 보기 버튼 추가 */}
            <div className="flex items-center mb-4">
              <div className="w-1 h-5 bg-[#00bd36] rounded-full mr-2"></div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">최근 거래 내역</h2>
            </div>
          <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl">
            {/* 거래내역 카드 스켈레톤 */}
            <div className="space-y-3">
              {[1,2,3].map((item, idx) => (
                <div key={item} className="bg-white rounded-xl flex items-center px-4 py-4 shadow-sm">
                  {/* 좌측 원형 아이콘 스켈레톤 */}
                  <div className="flex-shrink-0">
                    <Skeleton className="h-10 w-10 rounded-full bg-blue-100 animate-pulse" />
                  </div>
                  {/* 가운데 텍스트 2줄 */}
                  <div className="flex-1 ml-4">
                    <Skeleton className="h-4 w-24 mb-2 animate-pulse" />
                    <Skeleton className="h-3 w-32 animate-pulse" />
                  </div>
                  {/* 우측 금액 */}
                  <div className="flex-shrink-0 ml-4 text-right">
                    <Skeleton className="h-4 w-14 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            {/* 하단 전체 거래내역 보기 버튼 */}
            <div className="flex justify-center items-center h-8 mt-6">
              <Button
                variant="ghost"
                className="text-[#666666] flex items-center justify-center gap-1 text-base leading-none"
              >
                전체 거래내역 보기
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Wallet Guide Skeleton */}
        <div className="mt-6">
        <Button
            variant="outline"
            className="w-full flex items-center justify-between text-[#666666] border-dashed"
        >
        <div className="flex items-center">
          <Info className="h-4 w-4 mr-2" />
          <span>전자지갑 이용 안내</span>
        </div>
         <ChevronRight className="h-4 w-4" />
         </Button>
        </div>
      </header>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}

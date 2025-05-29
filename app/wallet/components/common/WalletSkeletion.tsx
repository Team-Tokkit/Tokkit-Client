"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function WalletSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between p-4 border-b">
          <Skeleton className="h-6 w-6 rounded animate-pulse" />
          <Skeleton className="h-6 w-16 animate-pulse" />
          <div className="w-6" />
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
        <div className="px-4 pb-4">
          <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl">
            <div className="flex items-center mb-4">
              <Skeleton className="h-5 w-16 animate-pulse" />
            </div>

            {/* Enhanced Transaction Items Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((item, index) => (
                <div
                  key={item}
                  className="bg-white rounded-lg p-4 relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Shimmer effect for each transaction */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/80 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center">
                      {/* Transaction Icon Skeleton */}
                      <div className="relative">
                        <Skeleton className="h-10 w-10 rounded-full bg-blue-100 animate-pulse" />
                        {/* Inner icon skeleton */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Skeleton className="h-4 w-4 rounded bg-blue-200 animate-pulse" />
                        </div>
                      </div>

                      <div className="ml-3 space-y-2">
                        {/* Transaction type skeleton */}
                        <Skeleton className="h-4 w-20 animate-pulse" />
                        {/* Date/time skeleton */}
                        <Skeleton className="h-3 w-32 animate-pulse" />
                      </div>
                    </div>

                    {/* Amount skeleton */}
                    <div className="text-right space-y-1">
                      <Skeleton className="h-4 w-16 animate-pulse ml-auto" />
                      <Skeleton className="h-3 w-8 animate-pulse ml-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button Skeleton */}
            <div className="flex justify-center items-center h-8 mt-6">
              <div className="relative overflow-hidden bg-transparent border-0 rounded-lg px-4 py-2 flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                <div className="flex items-center space-x-1 relative z-10">
                  <Skeleton className="h-4 w-24 animate-pulse" />
                  <Skeleton className="h-3 w-3 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Guide Skeleton */}
        <div className="px-4 pb-6">
          <div className="bg-white rounded-lg p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5 rounded-full animate-pulse" />
                <Skeleton className="h-4 w-24 ml-2 animate-pulse" />
              </div>
              <Skeleton className="h-4 w-4 animate-pulse" />
            </div>
          </div>
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

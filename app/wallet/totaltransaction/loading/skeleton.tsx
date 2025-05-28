import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Search, Calendar } from "lucide-react"

export const SkeletonLoader = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <div className="bg-white p-4 shadow-sm border-b">
        <div className="flex items-center gap-3">
          <ArrowLeft className="h-6 w-6 text-gray-400" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      <div className="p-4 bg-white shadow-sm">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Calendar className="absolute inset-0 m-auto h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>

      <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl flex-1">
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <TransactionItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

const TransactionItemSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Icon Skeleton */}
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-2">
            {/* Transaction Description */}
            <Skeleton className="h-4 w-32" />
            {/* Transaction Date */}
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <div className="text-right space-y-2">
          {/* Amount */}
          <Skeleton className="h-4 w-20" />
          {/* Status */}
          <Skeleton className="h-3 w-12 rounded-full" />
        </div>
      </div>
    </div>
  )
}


export const SearchBarSkeleton = () => (
  <div className="flex gap-2 mb-4">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
    <div className="relative">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <Calendar className="absolute inset-0 m-auto h-4 w-4 text-gray-400" />
    </div>
  </div>
)

export const CategoryFilterSkeleton = () => (
  <div className="flex gap-2">
    <Skeleton className="h-8 w-20 rounded-full" />
    <Skeleton className="h-8 w-24 rounded-full" />
  </div>
)

export const TransactionListSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow-sm animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-3 w-12 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

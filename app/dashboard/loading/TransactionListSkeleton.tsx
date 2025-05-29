interface TransactionListSkeletonProps {
  count?: number
}

export default function TransactionListSkeleton({ count = 3 }: TransactionListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
    </div>
  )
}

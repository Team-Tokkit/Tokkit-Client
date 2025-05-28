export function VoucherDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-8">
      {/* HeaderImage Placeholder - 실제 HeaderImage와 동일한 높이 */}
      <div className="relative w-full h-[250px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 space-y-4">
          <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* VoucherInfo Placeholder */}
        <div className="flex justify-between bg-white rounded-xl shadow-sm p-6 items-center">
          <div className="space-y-4">
            <div className="h-10 w-40 bg-gray-300 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>

        {/* 상세 설명 ExpandableSection */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-300 rounded mr-4 animate-pulse" />
              <div className="h-7 w-24 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="h-6 w-6 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="p-6 space-y-4">
            <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* 사용처 ExpandableSection */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-300 rounded mr-4 animate-pulse" />
              <div className="h-7 w-20 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="h-6 w-6 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="p-6 space-y-4">
            {/* StoreList 스켈레톤 */}
            <div className="space-y-4">
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-2/5 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* 환불 정책 ExpandableSection */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-300 rounded mr-4 animate-pulse" />
              <div className="h-7 w-28 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="h-6 w-6 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="p-6 space-y-4">
            <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* 문의처 Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <div className="h-7 w-20 bg-gray-300 rounded animate-pulse" />
          <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

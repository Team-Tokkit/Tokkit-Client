export function VoucherDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-5">
      {/* HeaderImage Placeholder */}
      <div className="w-full h-[200px] bg-gray-200 animate-pulse" />

      <div className="p-4 space-y-6">
        {/* VoucherInfo Placeholder */}
        <div className="flex justify-between bg-white rounded-xl shadow-sm p-4 items-center">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>

        {/* 상세 설명 Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-300 rounded-full mr-3 animate-pulse" />
            <div className="h-5 w-20 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* 사용처 Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-300 rounded-full mr-3 animate-pulse" />
            <div className="h-5 w-20 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* 환불 정책 Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-300 rounded-full mr-3 animate-pulse" />
            <div className="h-5 w-24 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* 문의처 Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
          <div className="h-5 w-20 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

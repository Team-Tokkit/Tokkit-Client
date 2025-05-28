import { Suspense } from "react"
import VoucherHeader from "@/app/vouchers/components/VoucherHeader"
import VoucherList from "@/app/vouchers/components/VoucherList"
import VoucherCategoryWithFilter from "@/app/vouchers/components/VoucherCategoryWithFilter"
import VoucherSearchBar from "@/app/vouchers/components/VoucherSearchBar"

export default function VouchersPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-5">
      <VoucherHeader title="바우처 구매하기" />

      <div className="p-4 bg-white shadow-sm">
        <Suspense fallback={<div>Loading...</div>}>
          <VoucherSearchBar />
        </Suspense>
        <div className="mt-4 flex items-center justify-start flex-wrap overflow-x-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <VoucherCategoryWithFilter />
          </Suspense>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">전체 바우처</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <VoucherList />
        </Suspense>
      </div>
    </div>
  )
}

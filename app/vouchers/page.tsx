import VoucherHeader from "@/components/dashboard/voucher/VoucherHeader"
import VoucherList from "@/components/dashboard/voucher/VoucherList"
import VoucherCategoryWithFilter from "@/components/dashboard/voucher/VoucherCategoryWithFilter"
import VoucherSearchBar from "@/components/dashboard/voucher/VoucherSearchBar"


export default function VouchersPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-5">
      <VoucherHeader title="바우처 구매하기" />

      <div className="p-4 bg-white shadow-sm">
        <VoucherSearchBar />
        <div className="mt-4 flex items-center justify-start flex-wrap overflow-x-hidden">
  <VoucherCategoryWithFilter />
</div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">전체 바우처</h2>
        <VoucherList />
      </div>
    </div>
  )
}

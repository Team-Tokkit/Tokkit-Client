import VoucherHeader from "@/components/dashboard/voucher/VoucherHeader"
import MyVoucherList from "@/components/dashboard/my-voucher/MyVoucherList"
import MyVoucherTabFilter from "@/components/dashboard/my-voucher/MyVoucherTabFilter"
import VoucherSearchBar from "@/components/dashboard/voucher/VoucherSearchBar"
import { mockMyVouchers } from "@/mock/my-voucher"

export default function MyVouchersPage() {
  const myVouchers = mockMyVouchers

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] pb-20">
      <VoucherHeader title="내 바우처" />

      <div className="p-4 bg-white dark:bg-[#1A1A1A] shadow-sm">
        <VoucherSearchBar />
        <div className="mt-4">
          <MyVoucherTabFilter />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">내 바우처 ({myVouchers.length})</h2>
        <MyVoucherList vouchers={myVouchers} />
      </div>
    </div>
  )
}
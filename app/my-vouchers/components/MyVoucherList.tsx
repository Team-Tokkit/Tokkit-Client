"use client"

import MyVoucherCard from "./MyVoucherCard"
import type { MyVoucher } from "@/app/my-vouchers/types/my-voucher"

interface Props {
  myVouchers: MyVoucher[]
  loading: boolean
}

export default function MyVoucherList({ myVouchers, loading }: Props) {
  if (loading) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-[#FAFAFA]">
        <img
          src="/images/loading-bunny.png"
          alt="로딩 중"
          className="w-32 h-28 md:w-48 md:h-40 mb-6 object-contain"
        />
        <p className="text-[#666666] text-lg font-medium">바우처를 불러오는 중입니다...</p>
      </div>
    )
  }

  if (!Array.isArray(myVouchers)) {
    return <p className="text-center">잘못된 데이터 형식입니다.</p>
  }

  if (myVouchers.length === 0) {
    return <p className="text-center">보유한 바우처가 없습니다.</p>
  }

  return (
    <div className="space-y-4">
      {myVouchers.map((voucher) => (
        <MyVoucherCard key={voucher.id} voucher={voucher} />
      ))}
    </div>
  )
}

"use client"

import MyVoucherCard from "./MyVoucherCard"
import type { MyVoucher } from "@/types/my-voucher"

interface Props {
  vouchers: MyVoucher[]
}

export default function MyVoucherList({ vouchers }: Props) {
  if (vouchers.length === 0) return <p className="text-center">보유한 바우처가 없습니다.</p>

  return (
    <div className="space-y-4">
      {vouchers.map((voucher) => (
        <MyVoucherCard key={voucher.id} voucher={voucher} />
      ))}
    </div>
  )
}
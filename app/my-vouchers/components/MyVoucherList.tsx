"use client"

import MyVoucherCard from "./MyVoucherCard"
import type { MyVoucher } from "@/app/my-vouchers/types/my-voucher"

interface Props {
  vouchers: MyVoucher[] 
  loading: boolean
  onDelete: (voucherId: number) => void 
}

export default function MyVoucherList({ vouchers, loading, onDelete }: Props) {
if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
          >
            <div className="h-40 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="flex justify-between items-center mt-4">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }


  if (!Array.isArray(vouchers)) {
    return <p className="text-center">잘못된 데이터 형식입니다.</p>
  }

  if (vouchers.length === 0) {
  return (
    <div className="flex items-center justify-center h-80">
      <p className="text-xl text-gray-500 text-center">
        보유한 바우처가 없습니다.
      </p>
    </div>
    )
  }

  return (
    <div className="space-y-4">
      {vouchers.map((voucher) => (
        <MyVoucherCard key={voucher.id} voucher={voucher} onDelete={onDelete} />
      ))}
    </div>
  )
}
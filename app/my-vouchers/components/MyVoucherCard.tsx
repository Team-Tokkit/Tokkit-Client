"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { MyVoucher } from "@/app/my-vouchers/types/my-voucher"
import StatusBadge from "@/app/my-vouchers/components/StatusBadge"

interface Props {
  voucher: MyVoucher
}

export default function MyVoucherCard({ voucher }: Props) {
  const isDisabled = ["USED", "EXPIRED", "CANCELLED"].includes(voucher.status)

  return (
    <Link
      href={`/my-vouchers/details/${voucher.id}?userId=10`}
      className="block bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden hover:-translate-y-0.5 transition-transform"
    >
      <div className="relative h-40">
        {/* 이미지 */}
        <Image
          src={voucher.imageUrl}
          alt={voucher.imageUrl}
          fill
          className="object-cover"
        />

        {/* 블러 처리 */}
        {isDisabled && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-20" />
        <div className="absolute top-4 right-4 z-30">
          <StatusBadge status={voucher.status} />
        </div>
        <div className="absolute bottom-0 left-0 p-4 z-30">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80 text-[#1A1A1A] shadow-sm mb-2">
            {voucher.contact}
          </span>
          <h3 className="text-xl font-bold text-white">{voucher.name}</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-3">
          <div>
            <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">잔액</p>
            <p className="text-lg font-bold">{voucher.remainingAmount.toLocaleString()}원</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">총 금액</p>
            <p className="text-lg font-bold">{voucher.originalPrice.toLocaleString()}원</p>
          </div>
        </div>

        {/* 게이지 바 */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isDisabled ? "bg-gray-400" : "bg-green-600"
            }`}
            style={{
              width: `${(voucher.remainingAmount / voucher.originalPrice) * 100}%`,
            }}
          />
        </div>

        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-[#666666] mr-2" />
          <p className="text-xs text-[#666666]">유효기간: {voucher.validDate}</p>
        </div>
      </div>
    </Link>
  )
}
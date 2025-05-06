"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronRight } from "lucide-react"
import { MyVoucher } from "@/types/my-voucher"
import StatusBadge from "@/components/dashboard/my-voucher/StatusBadge"

interface Props {
  voucher: MyVoucher
}

export default function MyVoucherCard({ voucher }: Props) {
    return (
      <Link
        href={`/my-vouchers/${voucher.id}`}
        className="block bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden hover:-translate-y-0.5 transition-transform"
      >
        <div className="relative h-32">
          <Image src={voucher.image} alt={voucher.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute top-4 right-4">
            <StatusBadge isUsed={voucher.isUsed} />
          </div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80 dark:bg-black/50 text-[#1A1A1A] dark:text-white shadow-sm mb-2">
              {voucher.department}
            </span>
            <h3 className="text-xl font-bold text-white">{voucher.title}</h3>
          </div>
        </div>
  
        <div className="p-4">
          <div className="mb-3">
            <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">잔액</p>
            <p className="text-lg font-bold">{voucher.remainingAmount.toLocaleString()}원</p>
          </div>
  
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${(voucher.remainingAmount / voucher.totalAmount) * 100}%`,
                backgroundColor: voucher.color,
              }}
            />
          </div>
  
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-[#666666] dark:text-[#BBBBBB] mr-2" />
            <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">
              {voucher.isUsed ? "만료일: " : "유효기간: "}
              {voucher.expiryDate}
            </p>
          </div>
        </div>
      </Link>
    )
  }
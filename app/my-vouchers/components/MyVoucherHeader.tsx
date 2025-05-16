"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import StatusBadge from "@/app/my-vouchers/components/StatusBadge"
import { MyVoucherDetail } from "@/app/my-vouchers/types/my-voucher"

interface Props {
  voucher: MyVoucherDetail
}

export default function MyVoucherHeader({ voucher }: Props) {
  const router = useRouter()
  const isDisabled = ["USED", "EXPIRED", "CANCELLED"].includes(voucher.status)

  return (
    <div className="relative h-64">
      <div className="relative h-full w-full">
        <Image
          src={voucher.imageUrl || "/placeholder.svg"}
          alt={voucher.voucherName || "이미지 설명 없음"}
          fill
          className={`object-cover ${
            isDisabled ? "blur-sm" : ""
          }`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" />

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md text-white transition z-20"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* 상태 뱃지 */}
      <div className="absolute top-4 right-4 z-20">
        <StatusBadge status={voucher.status} />
      </div>

      {/* 바우처 정보 */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80 text-[#1A1A1A] shadow-sm mb-2">
          {voucher.voucherContact || "문의처 정보가 없습니다."}
        </span>
        <h1 className="text-2xl font-bold text-white">{voucher.voucherName}</h1>
      </div>
    </div>
  )
}
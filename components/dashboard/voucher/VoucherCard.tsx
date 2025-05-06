"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Voucher } from "@/types/voucher"

interface Props {
  voucher: Voucher
  onCardClick?: (voucher: Voucher) => void
  onActionClick?: (voucher: Voucher) => void
  actionLabel?: string
}

export default function VoucherCard({
  voucher,
  onCardClick,
  onActionClick,
  actionLabel = "결제하기",
}: Props) {
  const router = useRouter()

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(voucher)
    } else {
      router.push(`/vouchers/${voucher.id}`)
    }
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onActionClick) {
      onActionClick(voucher)
    } else {
      router.push(`/vouchers/apply/${voucher.id}`)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
    >
      <div className="relative h-40">
        <Image src={voucher.image} alt={voucher.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80 text-[#1A1A1A] shadow-sm mb-2">
            {voucher.merchant}
          </span>
          <h3 className="text-xl font-bold text-white">{voucher.name}</h3>
        </div>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-[#666666]">구매마감</p>
          <p className="text-sm font-medium">{new Date(voucher.validDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold mr-2">{voucher.price.toLocaleString()}원</span>
          <Button
            size="sm"
            className="rounded-lg bg-[#FFB020] hover:bg-[#FF9500] text-white"
            onClick={handleActionClick}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Voucher } from "@/types/voucher"

export default function VoucherCard({ voucher }: { voucher: Voucher }) {
  const router = useRouter()

  return (
    <motion.div
      className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden cursor-pointer"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => router.push(`/vouchers/${voucher.id}`)}
    >
      <div className="relative h-40">
        <Image src={voucher.image} alt={voucher.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80 dark:bg-black/50 text-[#1A1A1A] dark:text-white shadow-sm mb-2">
            {voucher.department}
          </span>
          <h3 className="text-xl font-bold text-white">{voucher.title}</h3>
        </div>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">신청마감</p>
          <p className="text-sm font-medium">{voucher.deadline}</p>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold mr-2">{voucher.amount}</span>
          <Button
            size="sm"
            className="rounded-lg bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A]"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/vouchers/apply/${voucher.id}`)
            }}
          >
            결제하기
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

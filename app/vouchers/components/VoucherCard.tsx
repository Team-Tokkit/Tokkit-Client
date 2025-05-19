"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Voucher } from "@/app/vouchers/types/voucher"

interface Props {
  voucher: Voucher
  onCardClick?: (voucher: Voucher) => void
  onActionClick?: (voucher: Voucher) => void
  actionLabel?: string
}

export default function VoucherCard({
  voucher,
  onCardClick,
  actionLabel = "구매하기",
}: Props) {
  const router = useRouter()

const handleCardClick = () => {
  if (onCardClick) {
    onCardClick(voucher)
  } else {
    router.push(`/vouchers/details/${voucher.id}`)
  }
}

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/vouchers/purchase?voucherId=${voucher.id}`);
  };

  const remainingCount = voucher.remainingCount;
  const fillPercent = Math.round(
    (100 * (voucher.totalCount - remainingCount)) / voucher.totalCount
  );

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
    >
      <div className="relative h-40">
        <Image
          src={voucher.imageUrl}
          alt={voucher.name}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          <span>남은 수량: {remainingCount}개</span>
          <div className="w-16 bg-gray-300 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-[#FFB020]"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{voucher.name}</h3>
        <p className="text-sm text-[#666666] mb-2">{voucher.description}</p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-[#666666]">유효기간</p>
            <p className="text-sm font-medium">
              {new Date(voucher.validDate).toLocaleDateString().replace(/\.$/, "")}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-lg font-bold inline-block">
                {voucher.price.toLocaleString()}원
                <span className="text-xs text-[#FF4D4F] ml-1 align-middle">토큰가</span>
              </p>
              {voucher.originalPrice && (
                <p className="text-xs text-[#666666] line-through">
                  {voucher.originalPrice.toLocaleString()}원
                </p>
              )}
            </div>
            <Button
              size="sm"
              className="rounded-lg bg-[#FFB020] hover:bg-[#FF9500] text-white"
              onClick={handleActionClick}
              disabled={remainingCount <= 0}
            >
              {remainingCount > 0 ? actionLabel : "품절"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
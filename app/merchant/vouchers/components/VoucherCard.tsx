import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Voucher } from "@/app/vouchers/types/voucher"
import { getImageSrc } from "@/lib/api/getImageSrc"

interface Props {
  voucher: Voucher
}

export default function VoucherCard({ voucher}: Props) {
  const router = useRouter()


  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-40">
        <Image
          src={getImageSrc(voucher.imageUrl)}
          alt={voucher.name}
          fill
          className="object-cover"
          unoptimized
        />
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
          </div>
        </div>
      </div>
    </motion.div>
  )
}
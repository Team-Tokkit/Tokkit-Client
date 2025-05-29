"use client"

import { Calendar } from "lucide-react"
import { MyVoucherDetail } from "@/app/my-vouchers/types/my-voucher"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  voucher: MyVoucherDetail
}

export default function MyVoucherInfo({ voucher }: Props) {
  const router = useRouter()

  const isDisabled = ["USED", "EXPIRED", "CANCELLED"].includes(voucher.status)

  const handleClick = () => {
    if (!isDisabled) {
      router.push("/payment")
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs text-[#666666]">잔액</p>
          <p className="text-2xl font-bold">
            {voucher.remainingAmount.toLocaleString()}원
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#666666]">총 금액</p>
          <p className="text-2xl font-medium text-[#666666]">
            {voucher.price.toLocaleString()}원
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isDisabled ? "bg-gray-400" : "bg-green-600"
          }`}
          style={{
            width: `${(voucher.remainingAmount / voucher.price) * 100}%`,
          }}
        />
      </div>

      <div className="flex items-center text-sm text-[#666666] mb-4">
        <Calendar className="h-4 w-4 text-[#666666] mr-2" />
        <p className="text-xs text-[#666666]">
          유효기간: {voucher.voucherValidDate}
        </p>
      </div>

      <Button
        className={`w-full ${
          isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFB020] hover:bg-[#FF9500]"
        } text-white`}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {isDisabled ? "사용할 수 없는 바우처입니다" : "바우처로 결제하기"}
      </Button>
    </div>
  )
}

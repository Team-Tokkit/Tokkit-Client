"use client"

import { Wallet, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface PurchaseTokenBalanceProps {
  userName: string
  accountNumber: string
  tokenBalance: number
}

export default function PurchaseTokenBalance({ userName, accountNumber, tokenBalance }: PurchaseTokenBalanceProps) {
  const router = useRouter()

  return (
    <motion.div
      className="relative w-full rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50 to-white p-4 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => router.push("/wallet")}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="absolute top-3 right-3">
        <div className="flex items-center text-xs text-gray-500 hover:text-[#FFB020]">
          <span>지갑으로 이동</span>
          <ArrowUpRight className="h-3 w-3 ml-1" />
        </div>
      </div>

      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#FFB020] mr-3">
          <Wallet className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">
            <span className="font-bold">{userName}</span> 님의 지갑
          </p>
          <p className="text-xs text-gray-500">{accountNumber}</p>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-sm text-gray-600">토큰 잔액</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-800">{tokenBalance.toLocaleString()}</p>
              <p className="ml-1 text-sm font-medium text-[#FFB020]">원</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

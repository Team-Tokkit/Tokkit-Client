"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"

export default function VoucherPurchasePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6">
      {/* Success animation */}
      <div className="mb-8 relative">
        {/* Circle background */}
        <motion.div
          className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Inner circle */}
          <motion.div
            className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            {/* Check mark */}
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            >
              <CheckIcon className="h-12 w-12 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="text-center mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">바우처 구매 성공!</h1>
        <p className="text-gray-500">구매하신 바우처는 내 바우처 목록에서 확인하실 수 있습니다.</p>
      </motion.div>

      <motion.button
        className="w-full max-w-xs bg-[#FFB020] text-white font-medium py-4 px-6 rounded-xl hover:bg-[#FF9500] transition shadow-md"
        onClick={() => router.push("/my-vouchers")}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        내 바우처 확인하기
      </motion.button>
    </div>
  )
}

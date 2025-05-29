"use client"

import { motion } from "framer-motion"

interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({ message = "로딩 중..." }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]  flex flex-col items-center justify-center p-6">
      <motion.div
        className="w-16 h-16 mb-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 border-4 border-[#FFB020]  rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </motion.div>

      <motion.p
        className="text-[#666666]  text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  )
}

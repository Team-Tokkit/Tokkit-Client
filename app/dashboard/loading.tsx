"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]  flex flex-col items-center justify-center">
      <motion.div
        className="w-12 h-12 rounded-full border-2 border-[#FFB020]  border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <p className="mt-4 text-[#666666] dark:text-[#BBBBBB] text-sm">로딩 중...</p>
    </div>
  )
}

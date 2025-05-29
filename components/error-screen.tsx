"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorScreenProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorScreen({
  title = "오류가 발생했습니다",
  message = "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  onRetry,
}: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]  flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-6 text-red-500"
      >
        <AlertTriangle className="h-24 w-24" />
      </motion.div>

      <motion.h1
        className="text-2xl font-bold text-[#1A1A1A]  mb-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-[#666666]  mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>

      {onRetry && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button
            className="bg-[#FFB020] hover:bg-[#FF9500]   text-white "
            onClick={onRetry}
          >
            다시 시도
          </Button>
        </motion.div>
      )}
    </div>
  )
}

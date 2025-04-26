"use client"

import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"

interface PullHandleProps {
  onPull: () => void
}

export default function PullHandle({ onPull }: PullHandleProps) {
  return (
    <motion.div
      className="bg-[#FFB020] dark:bg-[#FFD485] h-16 w-6 rounded-l-lg flex items-center justify-center cursor-grab shadow-md active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: -50, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(e, info) => {
        if (info.offset.x < -15) {
          onPull()
        }
      }}
    >
      <ChevronLeft className="h-4 w-4 text-white dark:text-[#1A1A1A]" />
    </motion.div>
  )
}

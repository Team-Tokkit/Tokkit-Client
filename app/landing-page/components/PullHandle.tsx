"use client"

import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"

interface PullHandleProps {
    onPull: () => void
}

export default function PullHandle({ onPull }: PullHandleProps) {
    return (
        <motion.div
            className="bg-[#FFB020] h-16 w-6 rounded-l-lg flex items-center justify-center cursor-grab shadow-md active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: -50, right: 0 }}
            dragElastic={0.1}
            animate={{ x: 0 }} // 항상 초기화
            transition={{ type: "spring", stiffness: 300, damping: 20 }} // 부드럽게 복원
            onDragEnd={(e, info) => {
                if (info.offset.x < -15) {
                    onPull()
                }
            }}
        >
            <ChevronLeft className="h-4 w-4 text-white" />
        </motion.div>
    )
}

"use client"

import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"

interface PullHandleProps {
  onPull: () => void
}

export default function PullHandle({ onPull }: PullHandleProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [dragDistance, setDragDistance] = useState(0)

  // CBDC 더 알아보기 텍스트가 들어갈 정도의 최대 너비 (160px)
  const getWidth = () => {
    if (!isDragging) return "24px"

    // 드래그 거리에 따라 너비 계산 (최대 160px로 제한)
    const calculatedWidth = 24 + Math.abs(dragDistance * 2)
    return `${Math.min(calculatedWidth, 160)}px`
  }

  return (
    <motion.div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* 단일 핸들 요소 */}
      <motion.div
        className="bg-[#FFB020] h-16 rounded-l-lg flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        animate={{
          width: getWidth(), // 최대 너비 제한 적용
          x: isDragging ? 0 : [0, -2, 0, -3, 0, -1, 0],
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          width: {
            type: "spring",
            stiffness: 300,
            damping: 25,
          },
          x: {
            repeat: isDragging ? 0 : Number.POSITIVE_INFINITY,
            duration: 0.8,
            repeatDelay: 5,
            ease: "easeInOut",
            times: [0, 0.2, 0.3, 0.5, 0.6, 0.8, 1],
          },
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
        drag="x"
        dragConstraints={{ left: -50, right: 0 }}
        dragElastic={0.1}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 6px 20px rgba(255, 176, 32, 0.3)",
        }}
        whileTap={{
          scale: 0.98,
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(e, info) => {
          setIsDragging(false)
          setDragDistance(0) // 드래그 끝나면 거리 초기화
          if (info.offset.x < -15) {
            onPull()
          }
        }}
        onDrag={(e, info) => {
          setDragDistance(info.offset.x) // 드래그한 거리 저장
        }}
        style={{
          boxShadow: "0 4px 12px rgba(255, 176, 32, 0.2)",
          minWidth: "24px",
        }}
      >
        <div className="flex items-center justify-center w-full h-full relative">
          {/* 심플한 아이콘 */}
          <motion.div
            animate={{
              x: isDragging ? 0 : [-1, 1, -1, 0],
              opacity: isDragging ? 0.7 : [0.8, 1, 0.8],
            }}
            transition={{
              repeat: isDragging ? 0 : Number.POSITIVE_INFINITY,
              duration: 0.5,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
            className="absolute left-1"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </motion.div>

          {/* Text that appears when dragging */}
          <motion.span
            className="text-white text-sm font-medium whitespace-nowrap ml-6"
            animate={{
              opacity: isDragging && Math.abs(dragDistance) > 10 ? 1 : 0,
              x: isDragging && Math.abs(dragDistance) > 10 ? 0 : 10,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            CBDC 더 알아보기
          </motion.span>
        </div>
      </motion.div>

      {/* Pull hint text */}
      <motion.div
        className="absolute -top-8 right-2 text-xs text-[#999999] whitespace-nowrap font-medium"
        animate={{
          opacity: isHovered && !isDragging ? 1 : 0,
          y: isHovered && !isDragging ? 0 : 3,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        살짝 당겨보세요 ✨
      </motion.div>
    </motion.div>
  )
}

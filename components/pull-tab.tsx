"use client"

import type React from "react"

import { useEffect } from "react"
import { motion, useAnimation, type PanInfo } from "framer-motion"
import { ChevronLeft } from "lucide-react"

interface PullTabProps {
  children: React.ReactNode
  tabState: "closed" | "peek" | "open"
  setTabState: (state: "closed" | "peek" | "open") => void
}

export default function PullTab({ children, tabState, setTabState }: PullTabProps) {
  const controls = useAnimation()

  // Tab width values
  const closedPosition = 0
  const peekPosition = 60
  const openPosition = 350

  useEffect(() => {
    switch (tabState) {
      case "closed":
        controls.start({ x: closedPosition })
        break
      case "peek":
        controls.start({ x: peekPosition })
        break
      case "open":
        controls.start({ x: openPosition })
        break
    }
  }, [tabState, controls])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info

    // Determine which state to snap to based on drag velocity and position
    if (velocity.x < -300) {
      // Fast drag to the left - open
      setTabState("open")
    } else if (velocity.x > 300) {
      // Fast drag to the right - close
      setTabState("closed")
    } else {
      // Slower drag - determine based on position
      const currentPosition = offset.x

      if (currentPosition < peekPosition / 2) {
        setTabState("closed")
      } else if (currentPosition < (peekPosition + openPosition) / 2) {
        setTabState("peek")
      } else {
        setTabState("open")
      }
    }
  }

  return (
    <motion.div
      className="fixed top-0 bottom-0 right-0 w-[350px] bg-white dark:bg-[#1E1E1E] shadow-lg z-50 flex"
      initial={{ x: closedPosition }}
      animate={controls}
      drag="x"
      dragConstraints={{ left: -openPosition, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
    >
      {/* Tab handle */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
        <div
          className="bg-[#FFB020] dark:bg-[#FFD485] h-24 w-10 rounded-l-lg flex items-center justify-center cursor-pointer shadow-md"
          onClick={() => setTabState(tabState === "closed" ? "peek" : tabState === "peek" ? "open" : "closed")}
        >
          <ChevronLeft
            className={`h-6 w-6 text-white dark:text-[#1A1A1A] transition-transform duration-300 ${
              tabState !== "closed" ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">{children}</div>
    </motion.div>
  )
}

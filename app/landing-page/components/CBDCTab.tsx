"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import TokenInfoCard from "@/app/landing-page/components/TokenInfoCard"
import type { CardInfo } from "@/app/landing-page/data/CardInfoData"

interface CBDCTabProps {
  isOpen: boolean
  onClose: () => void
  currentCard: number
  setCurrentCard: (index: number) => void
  cardInfo: CardInfo[]
}

export default function CBDCTab({ isOpen, onClose, currentCard, setCurrentCard, cardInfo }: CBDCTabProps) {
  const handleSwipe = (direction: number) => {
    const newIndex = currentCard + direction
    if (newIndex >= 0 && newIndex < cardInfo.length) {
      setCurrentCard(newIndex)
    }
  }

  // Animation variants for the bouncing effect
  const bounceAnimation = {
    animate: {
      y: [0, -5, 0, -3, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className="absolute inset-0 bg-[#F8F9FA] z-10"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="h-full flex flex-col p-6">
        {/* 상단 헤더 */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={onClose}>
            <ChevronLeft className="h-5 w-5 text-[#1A1A1A]" />
          </Button>
          <h2 className="text-xl font-semibold text-[#1A1A1A]">CBDC 알아보기</h2>
        </div>

        {/* 카드 영역 */}
        <div className="flex-1 relative flex items-center justify-center px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <TokenInfoCard
                cardKey={cardInfo[currentCard].cardKey}
                title={cardInfo[currentCard].title}
                description={cardInfo[currentCard].description}
                color={cardInfo[currentCard].color}
                icon={cardInfo[currentCard].icon}
              />
            </motion.div>
          </AnimatePresence>

          {/* 화살표 버튼 - 왼쪽 (애니메이션 추가) */}
          {currentCard > 0 && (
            <div className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
              <motion.div variants={bounceAnimation} animate="animate">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 rounded-full h-10 w-10 shadow-md"
                  onClick={() => handleSwipe(-1)}
                >
                  <ChevronLeft className="h-5 w-5 text-[#1A1A1A]" />
                </Button>
              </motion.div>
            </div>
          )}

          {/* 화살표 버튼 - 오른쪽 (애니메이션 추가) */}
          {currentCard < cardInfo.length - 1 && (
            <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
              <motion.div variants={bounceAnimation} animate="animate">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 rounded-full h-10 w-10 shadow-md"
                  onClick={() => handleSwipe(1)}
                >
                  <ChevronRight className="h-5 w-5 text-[#1A1A1A]" />
                </Button>
              </motion.div>
            </div>
          )}
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center gap-2 mt-8 mb-4">
          {cardInfo.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentCard === index ? "w-8 bg-[#FFB020]" : "w-2 bg-[#E0E0E0]"
              }`}
              onClick={() => setCurrentCard(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

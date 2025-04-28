"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import TokenInfoCard from "@/components/token-info-card"
import PullHandle from "@/components/pull-handle"
import MobileLayout from "./mobile-layout"

export default function Home() {
  const router = useRouter()
  const [isTabOpen, setIsTabOpen] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const mainControls = useAnimation()
  const tabControls = useAnimation()

  const cardInfo = [
    {
      title: "CBDC란?",
      description:
          "중앙은행 디지털 화폐(CBDC)는 중앙은행이 발행하는 디지털 형태의 법정 화폐입니다. 실물 화폐와 동일한 가치를 지니며, 블록체인 기술을 기반으로 합니다.",
      color: "#FFB020",
      icon: "💰",
    },
    {
      title: "안전한 거래",
      description:
          "CBDC는 중앙은행의 신뢰를 바탕으로 안전하고 투명한 거래를 보장합니다. 모든 거래는 암호화되어 보안성이 뛰어납니다.",
      color: "#FF4A4A",
      icon: "🔒",
    },
    {
      title: "빠른 송금",
      description:
          "국내외 어디서나 빠르고 저렴한 수수료로 송금이 가능합니다. 24시간 365일 실시간 결제와 송금이 이루어집니다.",
      color: "#3B82F6",
      icon: "⚡",
    },
    {
      title: "금융 포용성",
      description: "은행 계좌가 없는 사람들도 쉽게 금융 서비스를 이용할 수 있어 금융 포용성을 높입니다.",
      color: "#10B981",
      icon: "🌍",
    },
  ]

  useEffect(() => {
    if (isTabOpen) {
      mainControls.start({ x: "-100%" })
      tabControls.start({ x: 0 })
    } else {
      mainControls.start({ x: 0 })
      tabControls.start({ x: "100%" })
    }
  }, [isTabOpen, mainControls, tabControls])

  const handleCardChange = (index: number) => {
    setCurrentCard(index)
  }

  const handleSwipe = (direction: number) => {
    const newIndex = currentCard + direction
    if (newIndex >= 0 && newIndex < cardInfo.length) {
      setCurrentCard(newIndex)
    }
  }

  return (
      <MobileLayout>
        <div className="relative w-full h-screen overflow-hidden">
          {/* Main Content */}
          <motion.div
              className="absolute inset-0 flex flex-col items-center pt-12 px-6"
              initial={{ x: 0 }}
              animate={mainControls}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-full flex flex-col items-center">
              <motion.div
                  className="relative w-48 h-48 mb-6"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    y: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      ease: "easeInOut",
                    },
                    rotate: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 6,
                      ease: "easeInOut",
                    },
                  }}
              >
                <Image src="/images/bunny-mascot.png" alt="Tokkit 마스코트" fill className="object-contain" priority />
              </motion.div>

              <motion.h1
                  className="text-3xl font-bold text-center text-[#1A1A1A] mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
              >
                Tokkit
              </motion.h1>

              <motion.p
                  className="text-base text-center text-[#666666] mb-8 max-w-[280px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
              >
                중앙은행 디지털 화폐(CBDC)로 더 스마트하고 안전한 금융 생활을 시작하세요
              </motion.p>

              <motion.div
                  className="flex flex-col w-full max-w-xs gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
              >
                <Button
                    className="h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
                    onClick={() => router.push("/login")}
                >
                  로그인
                </Button>

                <Button
                    variant="outline"
                    className="h-12 border-[#FFB020]  text-[#FFB020] hover:bg-[#FFB020]/10 font-medium rounded-xl"
                    onClick={() => router.push("/signup/wallet")}
                >
                  전자지갑 개설 및 회원가입
                </Button>

                <div className="text-center mt-4">
                  <button
                      className="text-sm text-[#666666] hover:text-[#FFB020] transition-colors"
                      onClick={() => router.push("/merchant")}
                  >
                    가맹점주이신가요?
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Tab pull handle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <PullHandle onPull={() => setIsTabOpen(true)} />
            </div>
          </motion.div>

          {/* Slide-in Tab Content */}
          <motion.div
              className="absolute inset-0 bg-white z-10"
              initial={{ x: "100%" }}
              animate={tabControls}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="h-full flex flex-col p-6">
              <div className="flex items-center mb-6">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => setIsTabOpen(false)}>
                  <ChevronLeft className="h-5 w-5 text-[#1A1A1A]" />
                </Button>
                <h2 className="text-xl font-semibold text-[#1A1A1A]">CBDC 알아보기</h2>
              </div>

              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                      key={currentCard}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center p-4"
                  >
                    <TokenInfoCard
                        title={cardInfo[currentCard].title}
                        description={cardInfo[currentCard].description}
                        color={cardInfo[currentCard].color}
                        icon={cardInfo[currentCard].icon}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                {currentCard > 0 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full h-10 w-10 shadow-md"
                        onClick={() => handleSwipe(-1)}
                    >
                      <ChevronLeft className="h-5 w-5 text-[#1A1A1A]" />
                    </Button>
                )}

                {currentCard < cardInfo.length - 1 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full h-10 w-10 shadow-md"
                        onClick={() => handleSwipe(1)}
                    >
                      <ChevronRight className="h-5 w-5 text-[#1A1A1A]" />
                    </Button>
                )}
              </div>

              {/* Card indicators */}
              <div className="flex justify-center gap-2 mt-8 mb-4">
                {cardInfo.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            currentCard === index ? "w-8 bg-[#FFB020]" : "w-2 bg-[#E0E0E0]"
                        }`}
                        onClick={() => handleCardChange(index)}
                    />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </MobileLayout>
  )
}

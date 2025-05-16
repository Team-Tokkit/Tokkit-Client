"use client"

import { useState, useEffect } from "react"
import { useAnimation } from "framer-motion"
import LandingMain from "@/app/landing-page/components/LandingMain"
import CBDCTab from "@/app/landing-page/components/CBDCTab"
import { cardInfoData } from "@/app/landing-page/data/CardInfoData"

export default function Home() {
  // 상태 관리
  const [isTabOpen, setIsTabOpen] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)

  // 애니메이션 컨트롤
  const mainControls = useAnimation()
  const tabControls = useAnimation()

  // 탭 전환 애니메이션
  useEffect(() => {
    if (isTabOpen) {
      mainControls.start({ x: "-100%" })
      tabControls.start({ x: 0 })
    } else {
      mainControls.start({ x: 0 })
      tabControls.start({ x: "100%" })
    }
  }, [isTabOpen, mainControls, tabControls])

  // 컴포넌트 조립
  return (
      <div className="relative w-full h-screen overflow-hidden">
          <LandingMain onOpenTab={() => setIsTabOpen(true)} isTabOpen={isTabOpen} />
          <CBDCTab
            isOpen={isTabOpen}
            onClose={() => setIsTabOpen(false)}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            cardInfo={cardInfoData}
        />
      </div>
  )
}

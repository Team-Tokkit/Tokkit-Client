"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthButtons } from "@/components/auth-buttons"
import { MascotImage } from "@/app/merchant/components/MascotImage"
import { motion } from "framer-motion"

export default function MerchantPage() {
    const router = useRouter()
    const [isAnimating, setIsAnimating] = useState(false)

    const handleLogin = () => {
        setIsAnimating(true)
        setTimeout(() => {
            router.push("/merchant/login")
        }, 300)
    }

    const handleSignup = () => {
        setIsAnimating(true)
        setTimeout(() => {
            router.push("/merchant/signup")
        }, 300)
    }

    const handleSwitchToUser = () => {
        router.push("/") // 일반 사용자 랜딩 페이지 경로로 수정
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                {/* 마스코트 */}
                <div className="relative w-48 h-48 mb-6 bg-transparent">
                    <MascotImage
                        src="/images/merchant-bunny.png"
                        alt="Merchant Mascot"
                        isAnimating={isAnimating}
                        width={192}
                        height={192}
                    />
                </div>

                {/* 서비스명 & 설명 */}
                <motion.h1
                    className="text-3xl font-bold text-center text-[#1A1A1A] mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -20 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    Tokkit
                </motion.h1>

                <motion.p
                    className="text-base text-center text-[#666666] mb-8 max-w-[280px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isAnimating ? 0 : 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    중앙은행 디지털화폐(CBDC)로 <br />
                    스마트하고 안전한 금융 생활을 시작하세요
                </motion.p>

                {/* 로그인 / 회원가입 버튼 */}
                <div className="flex flex-col w-full max-w-xs gap-3">
                    <button
                        className="h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
                        onClick={handleLogin}
                    >
                        로그인
                    </button>
                    <button
                        className="h-12 border border-[#FFB020] text-[#FFB020] hover:bg-[#FFB020]/10 font-medium rounded-xl"
                        onClick={handleSignup}
                    >
                        전자지갑 개설 및 회원가입
                    </button>
                </div>

                {/* 일반 사용자 전환 */}
                <div className="text-center mt-4">
                    <button
                        className="text-sm text-[#666666] hover:text-[#FFB020] transition-colors"
                        onClick={handleSwitchToUser}
                    >
                        일반 사용자이신가요?
                    </button>
                </div>
            </div>
        </div>
    )
}

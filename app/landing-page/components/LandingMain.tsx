"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import PullHandle from "@/app/landing-page/components/PullHandle"

interface LandingMainProps {
    onOpenTab: () => void
    isTabOpen: boolean
}

export default function LandingMain({ onOpenTab, isTabOpen }: LandingMainProps) {
    const router = useRouter()

    return (
        // 🌟 전체 메인 영역 (로고, 슬로건, 버튼, 마스코트)
        <motion.div
            className="bg-[#F8F9FA] absolute inset-0 flex flex-col items-center pt-12 px-6"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* 🐰 마스코트 이미지 */}
            <div className="w-full flex flex-col items-center">
                <motion.div
                    className="relative w-48 h-48 mb-6"
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
                    transition={{
                        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                        rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                    }}
                >
                    <Image
                        src="/images/bunny-mascot.png"
                        alt="Tokkit 마스코트"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* 💬 서비스명 & 슬로건 */}
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

                {/* 🔘 로그인 / 회원가입 / 가맹점 버튼 */}
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
                        className="h-12 border-[#FFB020] text-[#FFB020] hover:bg-[#FFB020]/10 font-medium rounded-xl"
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

            {/* ☰ 슬라이드 탭 열기 핸들 */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <PullHandle onPull={onOpenTab} key={isTabOpen.toString()} />
            </div>
        </motion.div>
    )
}

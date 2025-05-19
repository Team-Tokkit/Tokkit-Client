"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WalletIntro() {
    const router = useRouter()

    return (
        <motion.div
            className="min-h-screen bg-[#FAFAFA] dark:bg-[#121212] flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <header className="p-4 flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/")}>
                    <ArrowLeft className="h-5 w-5 text-[#1A1A1A] dark:text-white" />
                </Button>
                <motion.h1
                    className="text-xl font-bold text-[#1A1A1A] dark:text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    전자지갑 개설
                </motion.h1>
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col p-6">
                <motion.div
                    className="mb-8 flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                >
                    <div className="relative w-16 h-16">
                        <Image src="/images/bunny-mascot.png" alt="Tokkit 마스코트" fill className="object-contain" />
                    </div>
                </motion.div>

                <motion.h2
                    className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-2 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    전자지갑 개설 및 회원가입
                </motion.h2>

                <motion.p
                    className="text-sm text-[#666666] dark:text-[#BBBBBB] mb-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Tokkit 서비스 이용을 위한 전자지갑 개설과 회원가입을 진행합니다
                </motion.p>

                <motion.div
                    className="w-full max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-5 shadow-sm">
                            <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-3">전자지갑 개설 절차</h3>
                            <ol className="space-y-3">
                                {steps.map((step, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="w-6 h-6 rounded-full bg-[#FFB020] dark:bg-[#FFD485] text-white dark:text-[#1A1A1A] flex items-center justify-center mr-3 font-medium text-sm">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#1A1A1A] dark:text-white">{step.title}</p>
                                            <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">{step.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <Button
                            className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A] font-medium rounded-xl shadow-md shadow-[#FFB020]/20 dark:shadow-[#FFD485]/10"
                            onClick={() => router.push("/merchant/signup/wallet/terms")}
                        >
                            시작하기
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

const steps = [
    {
        title: "약관 동의",
        description: "서비스 이용 및 전자지갑 개설을 위한 약관 동의"
    },
    {
        title: "본인인증",
        description: "이름, 주민등록번호, 주민등록증 발급일자를 통한 본인인증"
    },
    {
        title: "연락처 정보 입력",
        description: "이메일, 전화번호 입력 및 인증"
    },
    {
        title: "간편 비밀번호 설정",
        description: "전자지갑 이용을 위한 간편 비밀번호 설정"
    }
]

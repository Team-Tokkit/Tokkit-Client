"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    onDone: () => void
}

export default function StepComplete({ onDone }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mb-6 inline-block"
            >
                <CheckCircle className="h-24 w-24 text-green-500" />
            </motion.div>

            <h2 className="text-xl font-bold mb-2">비밀번호 변경 완료</h2>
            <p className="text-[#666666] dark:text-[#BBBBBB] mb-8">
                간편 비밀번호가 성공적으로 변경되었습니다.
            </p>

            <Button
                className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A]"
                onClick={onDone}
            >
                로그인 화면으로 돌아가기
            </Button>
        </motion.div>
    )
}

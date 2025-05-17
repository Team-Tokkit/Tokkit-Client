"use client"

import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Props {
    email: string
    onDone: () => void
}

export default function ResetPinComplete({ email, onDone }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center"
        >
            <img src="/images/bunny-complete.png" alt="Security Mascot" className="mx-auto mb-6 w-1/2" />

            <h2 className="text-xl font-bold mb-2 text-[#111827]">이메일 발송 완료</h2>
            <p className="text-[#666666] mb-4 max-w-xs mx-auto">
                {email}로 새로운 간편 비밀번호가 발송되었습니다. 이메일을 확인해주세요.
            </p>
            <p className="text-sm text-[#666666] mb-8 max-w-xs mx-auto">
                이메일이 도착하지 않았다면 스팸함을 확인하시거나 잠시 후 다시 시도해주세요.
            </p>

            <Button className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white" onClick={onDone}>
                마이페이지로 돌아가기
            </Button>
        </motion.div>
    )
}

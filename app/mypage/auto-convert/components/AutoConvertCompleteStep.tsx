"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Props {
    settings: {
        dayOfMonth: number
        hour: number
        minute: number
        amount: number
    }
    onDone: () => void
}

export default function AutoConvertCompleteStep({ settings, onDone }: Props) {
    const { dayOfMonth, hour, minute, amount } = settings
    const formattedAmount = Number(amount).toLocaleString()

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center px-6 text-center"
        >
            <img src="/images/bunny-complete.png" alt="완료 마스코트" className="w-1/2 max-w-[200px] mx-auto mb-6" />
            <h2 className="text-xl font-bold mb-2 text-[#111827]">설정이 완료되었어요!</h2>
            <p className="text-sm text-[#666666] mb-8 leading-relaxed">
                매월 <span className="font-bold">{dayOfMonth}일</span>{" "}
                <span className="font-bold">{hour}시 {minute}분</span>에<br />
                <span className="font-bold">{formattedAmount}원</span>이 자동으로 전환돼요.
            </p>
            <Button
                className="w-full max-w-xs h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white"
                onClick={onDone}
            >
                마이페이지로 돌아가기
            </Button>
        </motion.div>
    )
}

"use client"

import VirtualKeypad from "@/components/virtual-keypad"
import { Loader2 } from "lucide-react"

interface Props {
    onSubmit: (pin: string) => void
    loading: boolean
}

export default function StepConfirmPin({ onSubmit, loading }: Props) {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-[#FFB020] dark:text-[#FFD485]" />
                <p className="mt-4 text-[#666666] dark:text-[#BBBBBB]">비밀번호 변경 중...</p>
            </div>
        )
    }

    return (
        <VirtualKeypad
            onComplete={onSubmit}
            title="비밀번호 확인"
            subtitle="새 비밀번호를 다시 한번 입력해주세요"
        />
    )
}

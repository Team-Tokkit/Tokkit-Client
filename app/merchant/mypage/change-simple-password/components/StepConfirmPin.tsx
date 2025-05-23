"use client"

import { Loader2 } from "lucide-react"
import VirtualKeypad from "@/components/virtual-keypad"

interface Props {
    onSubmit: (pin: string) => void
    loading: boolean
}

export default function StepConfirmPin({ onSubmit, loading }: Props) {
    return loading ? (
        <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-[#FFB020]" />
            <p className="mt-4 text-[#666666]">비밀번호 변경 중...</p>
        </div>
    ) : (
        <VirtualKeypad onComplete={onSubmit} hideTitle />
    )
}

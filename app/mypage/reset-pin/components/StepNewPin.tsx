"use client"

import VirtualKeypad from "@/components/virtual-keypad"

interface Props {
    onSubmit: (pin: string) => void
}

export default function StepNewPin({ onSubmit }: Props) {
    return (
        <VirtualKeypad
            onComplete={onSubmit}
            title="새 비밀번호 입력"
            subtitle="새로운 6자리 비밀번호를 입력해주세요"
        />
    )
}

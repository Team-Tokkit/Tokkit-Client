"use client"

import VirtualKeypad from "@/components/virtual-keypad"

interface Props {
    onSubmit: (pin: string) => void
}

export default function StepNewPin({ onSubmit }: Props) {
    return <VirtualKeypad onComplete={onSubmit} hideTitle />
}

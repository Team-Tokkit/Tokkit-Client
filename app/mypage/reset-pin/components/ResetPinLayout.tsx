"use client"

import { ReactNode } from "react"
import ResetPinHeader from "./ResetPinHeader"

interface Props {
    children: ReactNode
}

export default function ResetPinLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#121212] flex flex-col">
            <ResetPinHeader />
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xs">
                    {children}
                </div>
            </div>
        </div>
    )
}

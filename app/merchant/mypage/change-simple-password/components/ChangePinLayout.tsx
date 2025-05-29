"use client"

import { ReactNode } from "react"
import ChangePinHeader from "./ChangePinHeader"

interface Props {
    children: ReactNode
}

export default function ChangePinLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-[#FAFAFA]  flex flex-col">
            <ChangePinHeader />
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xs">
                    {children}
                </div>
            </div>
        </div>
    )
}

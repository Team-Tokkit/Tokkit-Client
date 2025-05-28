"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QRPageHeader() {
    const router = useRouter()

    return (
        <header className="bg-gradient-to-r from-[#FFB020] to-[#FF9500] p-4 pt-8 pb-4 shadow-lg flex-shrink-0">
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/20">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-lg font-bold text-white">가맹점 QR코드</h1>
                <div className="w-10" />
            </div>
        </header>
    )
}

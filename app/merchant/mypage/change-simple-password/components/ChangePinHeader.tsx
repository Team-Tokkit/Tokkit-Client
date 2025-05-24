"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChangePinHeader() {
    const router = useRouter()

    return (
        <header className="bg-[#F9FAFB] p-5 pt-8 pb-6">
            <div className="flex items-center justify-between mb-4 px-2">
                <Button variant="ghost" size="icon" onClick={() => router.push("/merchant/mypage")}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold">간편 비밀번호 변경</h1>
                <div className="w-10" />
            </div>
        </header>
    )
}

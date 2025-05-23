"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function MerchantMypageHeader() {
    const router = useRouter()
    return (
        <div className="flex items-center justify-between mb-8 px-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">마이페이지</h1>
            <div className="w-10" /> {/* 빈 공간 */}
        </div>
    )
}

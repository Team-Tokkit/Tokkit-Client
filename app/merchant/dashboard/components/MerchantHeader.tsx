"use client"

import { Bell, User } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function MerchantHeader() {
    const router = useRouter()
    return (
        <header className="bg-[#F9FAFB] p-5 pt-8 pb-0">
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-[#4B5563] h-10 w-10 hover:bg-[#FFD485]/10 bg-white/80 shadow-sm backdrop-blur-sm"
                        onClick={() => router.push("/merchant/notifications")}
                    >
                        <Bell className="h-5 w-5" />
                    </Button>
                </div>

                <div className="relative h-10 w-32">
                    <Image src="/images/tokkit-logo.png" alt="Tokkit Logo" fill className="object-contain" priority />
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-[#4B5563] h-10 w-10 hover:bg-[#FFD485]/10 bg-white/80 shadow-sm backdrop-blur-sm"
                    onClick={() => router.push("/merchant/mypage")}
                >
                    <User className="h-5 w-5" />
                </Button>
            </div>
        </header>
    )
}

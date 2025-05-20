"use client"

import { Bell, User } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MerchantHeaderProps {
    storeName: string
    unreadNotificationCount?: number
}

export function MerchantHeader({ storeName, unreadNotificationCount = 0 }: MerchantHeaderProps) {
    const router = useRouter()

    return (
        <header className="bg-white p-5 pt-8 pb-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFB020]/20 to-[#FF9500]/20 flex items-center justify-center mr-3">
                        <Image
                            src="/images/merchant-bunny.png"
                            alt="가맹점"
                            width={30}
                            height={30}
                            className="h-7 w-7 object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#1A1A1A]">{storeName}</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative rounded-full text-[#666666] bg-[#F5F5F5] h-9 w-9"
                        onClick={() => router.push("/merchant/notifications")}
                    >
                        <Bell className="h-4 w-4" />
                        {unreadNotificationCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                {unreadNotificationCount}
              </span>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-[#666666] bg-[#F5F5F5] h-9 w-9"
                        onClick={() => router.push("/merchant/mypage")}
                    >
                        <User className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}

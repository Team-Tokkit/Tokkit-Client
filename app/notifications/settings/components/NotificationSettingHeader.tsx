"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function NotificationSettingsHeader() {
    const router = useRouter()

    return (
        <header className="bg-white dark:bg-[#1A1A1A] p-5 pt-8 pb-4 shadow-sm sticky top-0 z-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2 rounded-full" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold">알림 설정</h1>
                </div>
            </div>
        </header>
    )
}

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function ChangePinHeader() {
    const router = useRouter()

    return (
        <header className="p-4 flex items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1A1A1A]">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/mypage")}>
                <ArrowLeft className="h-5 w-5 text-[#1A1A1A] dark:text-white" />
            </Button>
            <motion.h1
                className="text-xl font-bold text-[#1A1A1A] dark:text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                간편 비밀번호 변경
            </motion.h1>
        </header>
    )
}

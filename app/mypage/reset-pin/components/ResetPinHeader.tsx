"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function ResetPinHeader() {
    const router = useRouter()

    return (
        <header className="p-4 flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/login")}>
                <ArrowLeft className="h-5 w-5 text-[#1A1A1A] dark:text-white" />
            </Button>
            <motion.h1
                className="text-xl font-bold text-[#1A1A1A] dark:text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                간편 비밀번호 재설정
            </motion.h1>
        </header>
    )
}

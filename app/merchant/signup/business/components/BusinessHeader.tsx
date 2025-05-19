"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Store } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BusinessHeader() {
    const router = useRouter()

    return (
        <header className="p-4 flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/merchant/signup")}>
                <ArrowLeft className="h-5 w-5 text-[#1A1A1A] dark:text-white" />
            </Button>
            <motion.h1
                className="text-xl font-bold text-[#1A1A1A] dark:text-white flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Store className="h-5 w-5 mr-2 text-[#FFB020] dark:text-[#FFD485]" />
                사업자 정보 입력
            </motion.h1>
        </header>
    )
}
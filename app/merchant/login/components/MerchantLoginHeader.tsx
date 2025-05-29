"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function MerchantLoginHeader() {
    const router = useRouter()
    return (
        <header className="p-4 flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/merchant")}>
                <ArrowLeft className="h-5 w-5 text-[#1A1A1A] " />
            </Button>
            <motion.h1
                className="text-xl font-bold text-[#1A1A1A]  flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                가맹점주 로그인
            </motion.h1>
        </header>
    )
}

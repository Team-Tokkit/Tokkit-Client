"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function MerchantTermsHeader() {
    const router = useRouter()

    return (
        <header className="p-4 flex bg-[#F8F9FA] items-center border-b border-100 dark:border-gray-800">
            <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-gray-500 dark:text-gray-400"
                onClick={() => router.push("/merchant")}
            >
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <motion.h1
                className="text-xl font-bold text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                약관 동의
            </motion.h1>
        </header>
    )
}

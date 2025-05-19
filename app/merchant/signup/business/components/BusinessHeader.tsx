"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Store } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface BusinessHeaderProps {
    onBack: () => void
}

export default function BusinessHeader({ onBack }: BusinessHeaderProps) {
    return (
        <>
            <header className="p-4 flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-[#1A1A1A] dark:text-white"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
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

            <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Image
                    src="/images/merchant-bunny.png"
                    alt="가맹점 마스코트"
                    width={120}
                    height={120}
                    className="h-28 w-auto"
                />
            </motion.div>
        </>
    )
}

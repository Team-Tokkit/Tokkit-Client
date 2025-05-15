"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfileHeader() {
    const router = useRouter()

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center mb-6"
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full hover:bg-gray-200 mr-2"
            >
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">프로필 수정</h1>
        </motion.div>
    )
}
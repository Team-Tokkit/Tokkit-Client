"use client"

import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Props {
    user: { name: string; email: string; phone: string }
}

export default function MyPageHeader({ user }: Props) {
    const router = useRouter()

    return (
        <header className="bg-[#F9FAFB] p-5 pt-8 pb-6">
            <div className="flex items-center justify-between mb-8 px-2">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold">마이페이지</h1>
                <div className="w-10"></div>
            </div>

            <motion.div
                className="relative overflow-hidden rounded-2xl bg-white shadow-sm mx-2 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => router.push("/mypage/profile/edit")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <div className="relative z-10 p-6">
                    <div className="flex items-center mb-2">
                        <div className="w-12 h-12 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-3">
                            <span className="text-xl font-semibold text-gray-500">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-[#111827]">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                    </div>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                </div>
            </motion.div>
        </header>
    )
}

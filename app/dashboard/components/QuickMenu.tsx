"use client"

import { FileText, History, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function QuickMenu() {
    const router = useRouter()

    return (
        <div className="mb-8">
            <h3 className="text-sm font-medium text-[#111827] mb-4 px-1 flex items-center">
                <span className="bg-gradient-to-r from-[#FFB020] to-[#FF9500] w-1 h-4 rounded-full mr-2 inline-block" />
                빠른 메뉴
            </h3>
            <div className="grid grid-cols-3 gap-3">
                <motion.div
                    className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center cursor-pointer"
                    whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                    onClick={() => router.push("/vouchers")}
                >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFB020]/10 to-[#FF9500]/10 flex items-center justify-center mb-2">
                        <FileText className="h-5 w-5 text-[#FF9500]" />
                    </div>
                    <h4 className="text-xs font-medium text-[#111827] text-center">바우처</h4>
                </motion.div>

                <motion.div
                    className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center cursor-pointer"
                    whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                    onClick={() => router.push("/my-vouchers")}
                >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 flex items-center justify-center mb-2">
                        <History className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <h4 className="text-xs font-medium text-[#111827] text-center">내 바우처</h4>
                </motion.div>

                <motion.div
                    className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center cursor-pointer"
                    whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                    onClick={() => router.push("/offline-stores")}
                >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F6EF7]/10 to-[#3A5BD9]/10 flex items-center justify-center mb-2">
                        <MapPin className="h-5 w-5 text-[#4F6EF7]" />
                    </div>
                    <h4 className="text-xs font-medium text-[#111827] text-center">가맹점</h4>
                </motion.div>
            </div>
        </div>
    )
}

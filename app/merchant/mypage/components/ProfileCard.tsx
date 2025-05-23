"use client"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
    merchant: {
        name: string;
        storeName: string;
        email: string;
        phoneNumber: string;
        businessNumber: string;
        roadAddress: string;
        sido: string;
        sigungu: string;
        category: string;
    }
}

export default function ProfileCard({ merchant }: Props) {
    const router = useRouter()

    return (
        <motion.div
            className="relative overflow-hidden rounded-2xl bg-white shadow-sm mx-2 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/merchant/mypage/edit")}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
        >
            <div className="relative z-10 p-6">
                <div className="flex items-center mb-2">
                    <div>
                        <div className="flex items-center">
                            <p className="text-lg font-semibold text-[#111827]">{merchant.storeName}</p>
                            <span className="ml-2 px-2 py-0.5 bg-[#FFB020]/20 text-[#FFB020] text-xs rounded-full">가맹점</span>
                        </div>
                        <p className="text-sm text-gray-500">{merchant.email}</p>
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </div>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">대표자: {merchant.name}</p>
                    <p className="text-sm text-gray-500">사업자번호: {merchant.businessNumber}</p>
                    <p className="text-sm text-gray-500">{merchant.phoneNumber}</p>
                </div>
            </div>
        </motion.div>
    )
}

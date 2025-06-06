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
        category: string;
    }
}

export default function ProfileCard({ merchant }: Props) {
    const router = useRouter()

    return (
        <div 
            onClick={() => router.push ("/merchant/mypage/info") }
            className="relative overflow-hidden rounded-2xl bg-white shadow-sm mx-2 cursor-pointer">
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
        </div>
    )
}

export function ProfileCardSkeleton() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm mx-2 cursor-pointer">
            <div className="relative z-10 p-6">
                <div className="flex items-center mb-2">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                            <span className="h-6 w-28 bg-gray-200 rounded-md animate-pulse" />
                            <span className="ml-2 px-2 py-1 bg-yellow-100 rounded-full animate-pulse" />
                        </div>
                        <span className="h-4 w-32 bg-gray-100 rounded mb-1 block animate-pulse" />
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-gray-300" />
                </div>
                <div className="mt-2 space-y-2">
                    <span className="block h-4 w-28 bg-gray-100 rounded animate-pulse" />
                    <span className="block h-4 w-36 bg-gray-200 rounded animate-pulse" />
                    <span className="block h-4 w-20 bg-gray-100 rounded animate-pulse" />
                </div>
            </div>
        </div>
    )
}

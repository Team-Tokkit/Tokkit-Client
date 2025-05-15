"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Transaction {
    id: string
    merchant: string
    amount: number
    date: string
    icon: string
    color: string
}

interface RecentTransactionsProps {
    data: Transaction[]
}

export default function RecentTransactions({ data }: RecentTransactionsProps) {
    const router = useRouter()

    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-medium text-[#111827] flex items-center">
                    <span className="bg-gradient-to-r from-[#4F6EF7] to-[#3A5BD9] w-1 h-4 rounded-full mr-2 inline-block"></span>
                    최근 거래 내역
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-[#6B7280] p-0 h-auto"
                    onClick={() => router.push("/wallet/transactions")}
                >
                    전체보기 <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
            </div>

            <div className="space-y-2.5">
                {data.map((tx) => (
                    <motion.div
                        key={tx.id}
                        className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
                        whileHover={{ x: 5, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
                        transition={{ duration: 0.2 }}
                        onClick={() => router.push(`/wallet/transactions/${tx.id}`)}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[#F9FAFB] flex items-center justify-center mr-3 overflow-hidden">
                                <div className="relative w-6 h-6">
                                    <Image src={tx.icon || "/placeholder.svg"} alt={tx.merchant} fill className="object-contain" />
                                </div>
                            </div>
                            <div>
                                <p className="font-medium text-[#111827] text-sm">{tx.merchant}</p>
                                <p className="text-xs text-[#6B7280]">{tx.date}</p>
                            </div>
                        </div>
                        <div className={`font-semibold text-sm ${tx.amount > 0 ? "text-[#10B981]" : "text-[#111827]"}`}>
                            {tx.amount > 0 ? "+" : ""}
                            {tx.amount.toLocaleString()}원
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

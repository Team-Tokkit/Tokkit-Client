"use client"

import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import TransactionList from "./TransactionList"
import { MerchantTransaction } from "../api/merchant-transactions"
import TransactionListSkeleton from "@/app/dashboard/loading/TransactionListSkeleton"

interface Props {
    transactions: MerchantTransaction[]
    loading: boolean
}

export default function MerchantRecentTransaction({ transactions, loading }: Props) {
    const router = useRouter()

    return (
        <>
            <div className="flex items-center mb-3">
                <div className="w-1 h-5 bg-[#00bd36] rounded-full mr-2"></div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">최근 거래 내역</h2>
            </div>
            <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl">
                {loading ? (
                    <TransactionListSkeleton count={3} />
                ) : (
                    <TransactionList
                        transactions={transactions.map(t => ({
                            ...t,
                            description: t.displayDescription || ''
                        }))}
                        limit={3}
                    />
                )}
                <div className="flex justify-center items-center h-8 mt-5">
                    <Button
                        variant="ghost"
                        className="text-[#666666] flex items-center justify-center gap-1 text-base leading-none"
                        onClick={() => router.push("/merchant/wallet/totaltransaction")}
                    >
                        전체 거래내역 보기
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}

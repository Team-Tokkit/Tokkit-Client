"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/common/Header"
import WalletCard from "@/app/merchant/wallet/components/WalletCard"
import ConvertButton from "@/app/merchant/wallet/components/ConvertButton"
import WalletGuide from "@/app/merchant/wallet/components/WalletGuide"
import {
    fetchMerchantRecentTransactions,
    type MerchantTransaction,
} from "@/app/merchant/dashboard/api/merchant-transactions"
import MerchantRecentTransaction from "@/app/merchant/dashboard/components/MerchantRecentTransaction"
import WalletSkeleton from "@/app/merchant/wallet/components/WalletSkeleton"
import {fetchMerchantWalletInfo} from "@/app/merchant/dashboard/api/merchant-wallet-info";

export default function WalletClient() {
    const [loading, setLoading] = useState(true)
    const [recentMerchantTransactions, setRecentMerchantTransactions] = useState<MerchantTransaction[]>([])
    const [walletInfo, setWalletInfo] = useState<{
        storeName: string
        accountNumber: string
        tokenBalance: number
        depositBalance: number
    } | null>(null)

    const router = useRouter()
    const searchParams = useSearchParams()
    const refresh = searchParams.get("refresh")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [wallet, transactions] = await Promise.all([
                    fetchMerchantWalletInfo(),
                    fetchMerchantRecentTransactions(3),
                ])
                setWalletInfo(wallet)
                setRecentMerchantTransactions(transactions)
            } catch (error) {
                console.error("지갑 정보 또는 거래내역 로딩 실패:", error)
                alert("지갑 데이터를 불러오는 중 오류 발생")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [refresh])

    if (loading) return <WalletSkeleton />

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <header className="bg-white">
                <Header title="전자지갑" />
                {walletInfo && (
                    <WalletCard
                        storeName={walletInfo.storeName}
                        accountNumber={walletInfo.accountNumber}
                        tokenBalance={walletInfo.tokenBalance}
                        depositBalance={walletInfo.depositBalance}
                    />
                )}
                <div className="flex-1 flex flex-col p-4">
                    <ConvertButton />
                    <MerchantRecentTransaction transactions={recentMerchantTransactions} loading={false} />
                    <WalletGuide />
                </div>
            </header>
        </div>
    )
}

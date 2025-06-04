"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import BlockchainDetailsLoading from "../components/BlockchainDetailsLoading"
import { HeaderSection } from "../components/HeaderSection"
import {fetchMerchantTxDetail} from "@/app/merchant/wallet/api/fetch-merchant-txhash-detail";
import { BlockchainTransaction } from "@/app/wallet/blockchain-details/types/blockchain"
import MascotCardSection from "@/app/merchant/wallet/blockchain-details/components/MascotCardSection";
import {TransactionDetailCard} from "@/app/merchant/wallet/blockchain-details/components/TransactionDetailCard";

export default function BlockchainDetailsPage() {
    const { txHash } = useParams()
    const { toast } = useToast()
    const [transaction, setTransaction] = useState<BlockchainTransaction | null>(null)

    useEffect(() => {
        if (!txHash || typeof txHash !== "string") {
            toast({ title: "txHash 누락", description: "유효한 트랜잭션 해시가 필요합니다." })
            return
        }

        const fetchData = async () => {
            try {
                const tx = await fetchMerchantTxDetail(txHash)
                setTransaction(tx)
            } catch (error: any) {
                toast({ title: "트랜잭션 조회 실패", description: error.message })
            }
        }

        fetchData()
    }, [txHash])

    if (!transaction) {
        return <BlockchainDetailsLoading />
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] max-w-md mx-auto">
            <HeaderSection />
            <div className="p-5">
                <MascotCardSection />
                <TransactionDetailCard transaction={transaction} />
            </div>
        </div>
    )
}

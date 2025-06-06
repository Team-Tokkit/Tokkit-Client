"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Header from "@/components/common/Header"
import WalletGuide from "@/app/wallet/components/common/WalletGuide"
import TransactionList from "@/app/wallet/components/common/TransactionList"
import ConvertButton from "@/app/wallet/components/common/ConvertButton"
import WalletCard from "@/app/wallet/components/common/WalletCard"
import WalletSkeleton from "@/app/wallet/components/common/WalletSkeleton"
import { fetchWalletTransactions } from "@/app/wallet/api/wallet"
import { fetchWalletInfo } from "@/app/dashboard/api/wallet-info"

function WalletContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refresh = searchParams.get("refresh")

  const [userName, setUserName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [tokenBalance, setTokenBalance] = useState<number | null>(null)
  const [depositBalance, setDepositBalance] = useState<number | null>(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summary = await fetchWalletInfo()
        setUserName(summary.name)
        setAccountNumber(summary.accountNumber)
        setTokenBalance(summary.tokenBalance)
        setDepositBalance(summary.depositBalance)

        const txs = await fetchWalletTransactions()
        setTransactions(txs)
      } catch (error) {
        console.error("API 요청 오류:", error)
        alert("지갑 데이터를 불러오는 중 오류 발생")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refresh])

  const recentTransactions = transactions.slice(0, 3)

  if (loading) {
    return <WalletSkeleton />
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white">
        <Header title="전자지갑" backHref="/dashboard" />
        {tokenBalance !== null && depositBalance !== null && (
          <WalletCard
            tokenBalance={tokenBalance}
            depositBalance={depositBalance}
            userName={userName}
            accountNumber={accountNumber}
          />
        )}
        <div className="flex-1 flex flex-col p-4">
          <ConvertButton />

          <div>
            <div className="flex items-center mb-4">
                <div className="w-1 h-5 bg-[#00bd36] rounded-full mr-2"></div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">최근 거래 내역</h2>
            </div>
            <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl">
            <TransactionList transactions={recentTransactions} limit={3} />
            <div className="flex justify-center items-center h-8 mt-5">
              <Button
                variant="ghost"
                className="text-[#666666] flex items-center justify-center gap-1 text-base leading-none"
                onClick={() => router.push("/wallet/totaltransaction")}
              >
                전체 거래내역 보기
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          </div>

          <WalletGuide />
        </div>
      </header>
    </div>
  )
}

export default function WalletPage() {
  return (
    <Suspense fallback={<WalletSkeleton />}>
      <WalletContent />
    </Suspense>
  )
}

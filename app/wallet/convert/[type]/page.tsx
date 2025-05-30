"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/common/Header"
import ConvertSkeleton from "@/app/wallet/components/convertSkeleton"
import AmountStep from "@/app/wallet/components/AmountStep"
import ConfirmStep from "@/app/wallet/components/ConfirmStep"
import ProcessingStep from "@/app/wallet/components/ProcessingStep"
import CompleteStep from "@/app/wallet/components/CompleteStep"
import VerifySimplePassword from "@/app/payment/components/VerifySimplePassword"
import { fetchWalletBalance, verifyPassword, convertBalance } from "@/app/wallet/api/wallet"

export default function ConvertPage() {
  const router = useRouter()
  const params = useParams()
  const type = params.type as "deposit-to-token" | "token-to-deposit"
  const [loading, setLoading] = useState(true)

  const [step, setStep] = useState<"amount" | "confirm" | "password" | "processing" | "complete">("amount")
  const [amount, setAmount] = useState("")
  const [depositBalance, setDepositBalance] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)

  const isDepositToToken = type === "deposit-to-token"
  const title = isDepositToToken ? "예금 → 토큰" : "토큰 → 예금"

  useEffect(() => {
    fetchBalance()
  }, [])

  const fetchBalance = async () => {
    try {
      setLoading(true)
      const data = await fetchWalletBalance()
      setDepositBalance(data.depositBalance)
      setTokenBalance(data.tokenBalance)
    } catch (err) {
      alert("지갑 정보를 불러오지 못했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleMax = () => {
    const max = isDepositToToken ? depositBalance : tokenBalance
    setAmount(String(max))
  }

  const handlePasswordComplete = async (password: string) => {
    const amountNum = Number(amount)

    setStep("processing")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      await convertBalance(type, amountNum, password)
      await fetchBalance()
      setStep("complete")
    } catch (err: any) {
      alert(err.message)
      setStep("amount")
    }
  }

  if (loading) {
    return <ConvertSkeleton type={type} />
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <Header title={title} />
      <div className="flex-1 min-h-[calc(90vh-60px)]">
        {step === "amount" && (
          <AmountStep
            type={type}
            amount={amount}
            depositBalance={depositBalance}
            tokenBalance={tokenBalance}
            setAmount={setAmount}
            onMax={handleMax}
            onChange={setAmount}
            onContinue={() => setStep("confirm")}
          />
        )}

        {step === "confirm" && (
          <ConfirmStep
            type={type}
            amount={amount}
            depositBalance={depositBalance}
            tokenBalance={tokenBalance}
            onBack={() => setStep("amount")}
            onConfirm={() => setStep("password")}
          />
        )}

        {step === "password" && (
          <div className="flex flex-col items-center justify-center h-full px-4 pt-10">
            <img src="/images/bunny-lock.png" alt="간편 비밀번호 입력" className="w-32 h-auto mb-6" />
            <VerifySimplePassword onVerified={handlePasswordComplete} />
          </div>
        )}

        {step === "processing" && <ProcessingStep type={type} />}

        {step === "complete" && (
          <CompleteStep
            type={type}
            amount={amount}
            depositBalance={depositBalance}
            tokenBalance={tokenBalance}
            onBackToWallet={() => router.push("/wallet")}
          />
        )}
      </div>
    </div>
  )
}

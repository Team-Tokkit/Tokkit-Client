"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import BalanceCard from "@/app/wallet/components/convert/BalanceCard"
import AmountInput from "@/components/common/AmountInput"
import InfoBox from "@/app/wallet/components/common/InfoBox"
import { useMemo } from "react"

interface AmountStepProps {
  type: "deposit-to-token" | "token-to-deposit"
  amount: string
  depositBalance: number
  tokenBalance: number
  setAmount: React.Dispatch<React.SetStateAction<string>>
  onMax: () => void
  onChange: (val: string) => void
  onContinue: () => void
}

export default function AmountStep({
  type,
  amount,
  depositBalance,
  tokenBalance,
  setAmount,
  onMax,
  onChange,
  onContinue,
}: AmountStepProps) {
  const isDepositToToken = type === "deposit-to-token"
  const currentBalance = isDepositToToken ? depositBalance : tokenBalance

  const infoText = isDepositToToken
    ? "토큰을 예금으로 전환하면 즉시 반영됩니다. 예금은 언제든지 다시 토큰으로 전환할 수 있습니다."
    : "예금을 토큰으로 전환하면 즉시 반영됩니다. 토큰은 결제, 송금 등에 사용할 수 있으며, 언제든지 다시 예금으로 전환할 수 있습니다."

  const handleMaxAmount = () => {
    const max = currentBalance
    setAmount(String(max))
  }

  const isExceedingBalance = useMemo(() => {
    const numericAmount = Number(amount)
    return !isNaN(numericAmount) && numericAmount > currentBalance
  }, [amount, currentBalance])

  const isDisabled = !amount || Number(amount) <= 0 || isNaN(Number(amount)) || isExceedingBalance

  return (
    <div className="h-[calc(100vh-120px)] px-5 pb-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full" 
      >
        {/* 상단 콘텐츠 */}
        <div className="pb-32 max-w-sm mx-auto w-full">
          <div className="mt-6 mb-6">
            <BalanceCard type={type} depositBalance={depositBalance} tokenBalance={tokenBalance} />
          </div>

          <AmountInput
            amount={amount}
            onChange={onChange}
            onMax={handleMaxAmount}
            bottomRightText={
              isExceedingBalance && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 font-medium text-xs flex items-center gap-1"
                >
                  <span>⚠</span> 잔액을 초과했습니다
                </motion.span>
              )
            }
          />
        </div>

        {/* 하단 콘텐츠 - 절대 위치로 하단 고정 */}
        <div className="absolute bottom-6 left-5 right-5">
          <div className="mb-6">
            <InfoBox>{infoText}</InfoBox>
          </div>

          <Button
            className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
            onClick={onContinue}
            disabled={isDisabled}
          >
            계속하기
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

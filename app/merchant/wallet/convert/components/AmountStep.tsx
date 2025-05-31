"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BalanceCard from "@/app/wallet/components/convert/BalanceCard";
import AmountInput from "@/components/common/AmountInput";
import InfoBox from "@/app/wallet/components/common/InfoBox";
import { useMemo } from "react";

interface AmountStepProps {
  type: "deposit-to-token" | "token-to-deposit";
  amount: string;
  depositBalance: number;
  tokenBalance: number;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  onMax: () => void;
  onChange: (val: string) => void;
  onContinue: () => void;
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
  const isDepositToToken = type === "deposit-to-token";
  const currentBalance = isDepositToToken ? depositBalance : tokenBalance;

  const infoText = isDepositToToken
      ? "토큰을 예금으로 전환하면 즉시 반영됩니다. 예금은 언제든지 다시 토큰으로 전환할 수 있습니다."
      : "예금을 토큰으로 전환하면 즉시 반영됩니다. 토큰은 결제, 송금 등에 사용할 수 있으며, 언제든지 다시 예금으로 전환할 수 있습니다.";

  const handleMaxAmount = () => {
    const max = currentBalance;
    setAmount(String(max));
  };

  // 초과 여부 확인
  const isExceedingBalance = useMemo(() => {
    const numericAmount = Number(amount);
    return !isNaN(numericAmount) && numericAmount > currentBalance;
  }, [amount, currentBalance]);

  const isDisabled =
      !amount || Number(amount) <= 0 || isNaN(Number(amount)) || isExceedingBalance;

  return (
      <div className="flex flex-col flex-1 px-5 pb-6">
        <motion.div
            className="flex flex-col flex-1"
        >
          <div className="mt-4 mb-6">
            <BalanceCard
                type={type}
                depositBalance={depositBalance}
                tokenBalance={tokenBalance}
                className="max-w-sm mx-auto w-full"
            />
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
              className="max-w-sm mx-auto w-full"
          />

          <div className="mt-4 mb-6">
            <InfoBox>{infoText}</InfoBox>
          </div>

          <div className="mt-auto">
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
  );
}

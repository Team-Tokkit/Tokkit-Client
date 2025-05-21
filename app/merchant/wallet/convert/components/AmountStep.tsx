"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BalanceCard from "@/app/wallet/components/convert/BalanceCard";
import AmountInput from "@/components/common/AmountInput";
import InfoBox from "@/app/wallet/components/common/InfoBox";

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
  const isDepositToToken = type === "deposit-to-token"; // 예금 → 토큰일 때 true

  const infoText = isDepositToToken
    ? "토큰을 예금으로 전환하면 즉시 반영됩니다. 예금은 언제든지 다시 토큰으로 전환할 수 있습니다."
    : "예금을 토큰으로 전환하면 즉시 반영됩니다. 토큰은 결제, 송금 등에 사용할 수 있으며, 언제든지 다시 예금으로 전환할 수 있습니다.";

  // 수정된 handleMaxAmount 함수
  const handleMaxAmount = () => {
    const max = isDepositToToken ? depositBalance : tokenBalance; // 예금 → 토큰일 때는 예금 잔액, 반대는 토큰 잔액
    setAmount(String(max)); // 설정된 최대 금액을 입력란에 반영
  };

  return (
    <div className="flex flex-col flex-1 px-5 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col flex-1"
      >
        <div className="mt-4 mb-6">
          <BalanceCard
            type={type}
            depositBalance={depositBalance}
            tokenBalance={tokenBalance}
          />
        </div>

        <AmountInput
          amount={amount}
          onChange={onChange}
          onMax={handleMaxAmount} // 수정된 최대 금액 처리
        />

        <div className="mt-4 mb-6">
          <InfoBox>{infoText}</InfoBox>
        </div>

        <div className="mt-auto">
          <Button
            className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
            onClick={onContinue}
            disabled={!amount || Number(amount) <= 0}
          >
            계속하기
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

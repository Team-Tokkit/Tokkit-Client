import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BalanceCard from "@/components/wallet/convert/BalanceCard";

interface CompleteStepProps {
  type: "deposit-to-token" | "token-to-deposit";
  amount: string;
  depositBalance: number;
  tokenBalance: number;
  onBackToWallet: () => void;
}

export default function CompleteStep({
  type,
  amount,
  depositBalance,
  tokenBalance,
  onBackToWallet,
}: CompleteStepProps) {
  const parsedAmount = Number(amount);
  const isDepositToToken = type === "deposit-to-token";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-6 pb-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
      </motion.div>

      <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">전환 완료</h2>
      <p className="text-[#666666] text-center mb-6">
        {parsedAmount.toLocaleString()}원이{" "}
        {isDepositToToken ? "예금으로" : "토큰으로"} 전환되었습니다.
      </p>

      <div className="w-full">
        <BalanceCard
          type={type}
          depositBalance={depositBalance}
          tokenBalance={tokenBalance}
        />
      </div>

      <Button
        className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md mt-4"
        onClick={onBackToWallet}
      >
        지갑으로 돌아가기
      </Button>
    </motion.div>
  );
}

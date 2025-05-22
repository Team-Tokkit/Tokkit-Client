import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BalanceCard from "@/app/wallet/components/convert/BalanceCard";
import confetti from "canvas-confetti";

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
  const [done, setDone] = useState(false);
  const parsedAmount = Number(amount);
  const isDepositToToken = type === "deposit-to-token";

  useEffect(() => {
    if (!done) return;

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 450);

    return () => clearInterval(interval);
  }, [done]);

  return (
    <motion.div
      key="complete"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-2"
    >
      {!done ? (
        <motion.div
          key="spinner"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 540 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={() => setDone(true)}
          className="mb-6"
        >
          <LoaderCircle className="h-16 w-16 text-green-500" />
        </motion.div>
      ) : (
        <motion.div
          key="check"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-6"
        >
          <CheckCircle className="h-16 w-16 text-green-500" />
        </motion.div>
      )}

      <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 text-center">
        변환 완료
      </h2>
      <p className="text-[#666666] mb-6 text-center">
        {parsedAmount.toLocaleString()}원이{" "}
        {isDepositToToken ? "토큰으로" : "예금으로"} 변환되었습니다.
      </p>

      <div className="w-full max-w-md mb-2">
        <BalanceCard
          type={type}
          depositBalance={depositBalance}
          tokenBalance={tokenBalance}
        />
      </div>

      <Button
        className="w-full max-w-xs h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md mt-6"
        onClick={onBackToWallet}
      >
        지갑으로 돌아가기
      </Button>
    </motion.div>
  );
}

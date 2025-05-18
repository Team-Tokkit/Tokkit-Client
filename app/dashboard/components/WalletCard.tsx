"use client";

import { Wallet, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface WalletCardProps {
  userName: string;
  accountNumber: string;
  tokenBalance: number;
}

export default function WalletCard({
  userName,
  accountNumber,
  tokenBalance,
}: WalletCardProps) {
  const router = useRouter();

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFBA2D] to-[#FF9500] shadow-xl mx-2 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => router.push("/wallet")}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl" />

      <div className="relative z-10 p-6">
        <div className="flex items-center mb-5">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 shadow-md">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {userName} 님의 지갑
            </p>
            <p className="text-xs text-white/80 font-light">{accountNumber}</p>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div className="min-w-0">
            <p className="text-xs text-white/80 font-light">토큰 잔액</p>
            <div className="flex items-baseline mt-1">
              <p className="text-[28px] sm:text-3xl font-bold text-white truncate max-w-[160px]">
                {tokenBalance.toLocaleString()}
              </p>
              <p className="ml-1 text-lg text-white/90">원</p>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              className="bg-white/20 text-white hover:bg-white/30 rounded-lg text-xs px-4 py-1 h-9 shadow-sm flex items-center backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/wallet/convert/deposit-to-token");
              }}
            >
              <span>토큰 충전</span>
            </Button>
            <Button
              size="sm"
              className="bg-white text-[#FF9500] hover:bg-white/90 rounded-lg text-xs px-4 py-1 h-9 shadow-md font-medium"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/wallet/convert/token-to-deposit");
              }}
            >
              예금 전환
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

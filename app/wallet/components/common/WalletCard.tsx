"use client";

import { motion } from "framer-motion";
import { Wallet, ArrowRight } from "lucide-react";
import { Coins, Banknote } from "lucide-react";

interface WalletCardProps {
  tokenBalance: number;
  depositBalance: number;
  userName: string;
  accountNumber: string;
}

export default function WalletCard({
  tokenBalance,
  depositBalance,
  userName,
  accountNumber
}: WalletCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFB020] to-[#FF9500] shadow-lg mx-4 mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>

      <div className="relative z-10 p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 shadow-md">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {userName} 님의 지갑
            </p>
            <p className="text-xs text-white/80">{accountNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-blue-500" />
                <p className="text-sm font-medium text-white">토큰 잔액</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              {tokenBalance.toLocaleString()}
              <span className="text-base font-normal ml-1">원</span>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-green-500" />
                <p className="text-sm font-medium text-white">예금 잔액</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              {depositBalance.toLocaleString()}
              <span className="text-base font-normal ml-1">원</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

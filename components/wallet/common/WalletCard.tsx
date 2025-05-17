import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

interface WalletCardProps {
  tokenBalance: number;
  depositBalance: number;
  userName: string;
}

export default function WalletCard({
  tokenBalance,
  depositBalance,
  userName,
}: WalletCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFB020] to-[#FF9500] shadow-lg mx-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
      <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>

      <div className="relative z-10 p-5">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 shadow-md">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {userName} 님의 지갑
            </p>
            <p className="text-xs text-white/80">우리 1111-2222-3333</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          <div className="mb-4">
            <p className="text-xs text-white/80">토큰 잔액</p>
            <div className="flex items-baseline mt-1">
              <p className="text-3xl font-bold text-white">
                {tokenBalance.toLocaleString()}
              </p>
              <p className="ml-1 text-lg text-white/90">원</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-white/80">예금 잔액</p>
            <div className="flex items-baseline mt-1">
              <p className="text-xl font-bold text-white/90">
                {depositBalance.toLocaleString()}
              </p>
              <p className="ml-1 text-sm text-white/80">원</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

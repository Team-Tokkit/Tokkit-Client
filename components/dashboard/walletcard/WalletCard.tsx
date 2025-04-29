"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import WalletButtons from "./WalletButtons";

interface WalletData {
    userName: string;
    balance: number;
    accountNumber: string;
}

export default function WalletCard({ walletData }: { walletData: WalletData }) {
    const router = useRouter();

    return (
        <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFB020] to-[#FF9500] shadow-lg mx-4 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push("/wallet")}
        >
            <div className="relative z-10 p-5">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                        <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{walletData.userName} 님의 지갑</p>
                        <p className="text-xs text-white/80">{walletData.accountNumber}</p>
                    </div>
                </div>
                <div className="mt-6 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-white/80">예금 토큰 잔액</p>
                        <div className="flex items-baseline mt-1">
                            <p className="text-3xl font-bold text-white">{walletData.balance}</p>
                            <p className="ml-1 text-lg text-white/90">원</p>
                        </div>
                    </div>
                    <WalletButtons />
                </div>
            </div>
        </motion.div>
    );
}

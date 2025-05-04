"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { transactions } from "@/data/wallet/wallet";

import WalletHeader from "@/components/wallet/common/WalletHeader";
import WalletGuide from "@/components/wallet/common/WalletGuide";
import TransactionList from "@/components/wallet/common/TransactionList";
import ConvertButton from "@/components/wallet/common/ConvertButton";
import WalletCard from "@/components/wallet/common/WalletCard";

export default function WalletPage() {
  const router = useRouter();
  const tokenBalance = 123456789;
  const depositBalance = 987654321;
  const userName = "조윤주";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white">
        <WalletHeader title="전자지갑" />
        <WalletCard
          tokenBalance={tokenBalance}
          depositBalance={depositBalance}
          userName={userName}
        />
        <div className="flex-1 flex flex-col p-5">
          <ConvertButton />

          <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl">
            <TransactionList
              label="최근 거래"
              transactions={transactions}
              limit={3}
            />
            <div className="flex justify-center items-center h-8 mt-5">
              <Button
                variant="ghost"
                className="text-[#666666] flex items-center justify-center gap-1 text-base leading-none"
                onClick={() => router.push("/wallet/totaltransaction")}
              >
                전체 거래내역 보기
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <WalletGuide />
        </div>
      </header>
    </div>
  );
}

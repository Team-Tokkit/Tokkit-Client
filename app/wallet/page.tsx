"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Header from "@/components/common/Header";
import WalletGuide from "@/app/wallet/components/common/WalletGuide";
import TransactionList from "@/components/common/TransactionList";
import ConvertButton from "@/app/wallet/components/common/ConvertButton";
import WalletCard from "@/app/wallet/components/common/WalletCard";
import { fetchWalletTransactions } from "@/app/wallet/api/wallet";
import { getCookie } from "@/lib/cookies";
import { fetchWalletInfo } from "@/app/dashboard/api/wallet-info";

export default function WalletPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refresh = searchParams.get("refresh");

  const [userName, setUserName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [depositBalance, setDepositBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("accessToken");
        if (!token) throw new Error("토큰 없음");

        const summary = await fetchWalletInfo();
        setUserName(summary.name);
        setAccountNumber(summary.accountNumber);
        setTokenBalance(summary.tokenBalance);
        setDepositBalance(summary.depositBalance);

        const txs = await fetchWalletTransactions();
        setTransactions(txs);
      } catch (error) {
        console.error("API 요청 오류:", error);
        alert("지갑 데이터를 불러오는 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  const recentTransactions = transactions.slice(0, 3);

  return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <header className="bg-white">
          <Header title="전자지갑" />
          {tokenBalance !== null && depositBalance !== null && (
              <WalletCard
                  tokenBalance={tokenBalance}
                  depositBalance={depositBalance}
                  userName={userName}
                  accountNumber={accountNumber}
              />
          )}
          <div className="flex-1 flex flex-col p-4">
            <ConvertButton />

            <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl">
              {loading ? (
                  <p className="text-sm text-gray-400">
                    최근 거래를 불러오는 중...
                  </p>
              ) : (
                  <TransactionList
                      label="최근 거래"
                      transactions={recentTransactions}
                      limit={3}
                  />
              )}
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

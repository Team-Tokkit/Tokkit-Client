"use client";

import { useEffect, useState } from "react";
import { fetchWalletInfo } from "@/app/dashboard/api/wallet-info";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import SearchBar from "@/app/wallet/components/totalhistory/SearchBar";
import Category from "@/app/wallet/components/totalhistory/Category";
import Calendar from "@/components/common/Calendar";
import TransactionList from "@/app/wallet/components/common/TransactionList";
import {
  fetchTransactions,
  type Transaction,
} from "@/app/wallet/api/fetch-transactions";
import { SkeletonLoader } from "@/app/wallet/totaltransaction/loading/skeleton";

interface WalletInfo {
  userId: number;
  name: string;
  accountNumber: string;
  tokenBalance: number;
}

export default function TransactionsPage() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<{ from?: Date; to?: Date } | undefined>(
    undefined
  );

  const [type, setType] = useState("전체");
  const [period, setPeriod] = useState("전체 기간");

  const handleResetFilters = () => {
    setType("전체");
    setPeriod("전체 기간");
  };

  const typeOptions = [
    { label: "전체", value: "전체" },
    { label: "결제", value: "결제" },
    { label: "변환", value: "변환" },
  ];

  const periodOptions = [
    { label: "전체 기간", value: "전체 기간" },
    { label: "최근 1주일", value: "week" },
    { label: "최근 1개월", value: "month" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallet = await fetchWalletInfo();
        setWalletInfo(wallet);
      } catch (error) {
        console.error("지갑 정보 로드 실패:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error("거래내역 조회 오류:", error);
        alert("거래내역 불러오기 중 오류 발생");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTransactions = transactions.filter((tx: any) => {
    if (
      searchTerm &&
      !tx.displayDescription?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (type !== "전체") {
      const typeMap: Record<string, string> = {
        결제: "PURCHASE",
        변환: "CONVERT",
      };
      if (tx.type !== typeMap[type]) return false;
    }

    if (period !== "전체 기간") {
      const txDate = new Date(tx.createdAt);
      const today = new Date();
      const diff = today.getTime() - txDate.getTime();

      if (period === "week" && diff > 7 * 86400000) return false;
      if (period === "month" && diff > 30 * 86400000) return false;
    }

    if (date?.from) {
      const txDate = new Date(tx.createdAt);
      const from = new Date(date.from);
      const to = date.to ? new Date(date.to) : from;

      txDate.setHours(0, 0, 0, 0);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);

      if (txDate < from || txDate > to) return false;
    }

    return true;
  });

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header title="거래내역" />

      <div className="p-3 bg-white shadow-sm">
        <div className="flex gap-1 mb-2">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Button
            variant="outline"
            className="flex gap-2 items-center"
            onClick={() => {
              setSearchTerm("");
              setType("전체");
              setPeriod("전체 기간");
              setDate(undefined);

              setLoading(true);
              fetchTransactions()
                .then(setTransactions)
                .catch((err) => {
                  alert("거래내역 다시 불러오는 중 오류 발생");
                  console.error(err);
                })
                .finally(() => setLoading(false));
            }}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-1 items-center mb-2">
          <div
            className={`flex items-center text-sm rounded-md border h-10 px-4 w-full
      ${
        date?.from
          ? "bg-white text-gray-800 border-[#E0E0E0]"
          : "bg-[#F5F5F5] text-gray-400 border-gray-300 cursor-not-allowed"
      }`}
          >
            {date?.from
              ? `${date.from.toLocaleDateString()} ${
                  date.to ? `~ ${date.to.toLocaleDateString()}` : ""
                }`
              : "날짜를 선택해주세요"}
          </div>
          <Calendar
            selected={date}
            onSelect={setDate}
            onResetFilters={handleResetFilters}
          />
        </div>

        <div className="flex gap-1">
          <Category
            label="거래 유형"
            options={typeOptions}
            value={type}
            onChange={setType}
          />

          <Category
            label="조회 기간"
            options={periodOptions}
            value={period}
            onChange={setPeriod}
          />
        </div>
      </div>

      <div className=" px-4 py-5 rounded-xl">
        <TransactionList transactions={filteredTransactions} />
      </div>
    </div>
  );
}

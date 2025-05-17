"use client";

import { useEffect, useState } from "react";
import { fetchWalletInfo } from "@/app/dashboard/api/wallet-info";

import Header from "@/components/common/Header";
import SearchBar from "@/app/wallet/components/totalhistory/SearchBar";
import Category from "@/app/wallet/components/totalhistory/Category";
import Calendar from "@/app/wallet/components/totalhistory/Calendar";
import TransactionList from "@/components/common/TransactionList";
import { getApiUrl } from "@/lib/getApiUrl";
import { getCookie } from "@/lib/cookies";

const API_URL = getApiUrl();

interface WalletInfo {
  userId: number;
  name: string;
  accountNumber: string;
  tokenBalance: number;
}

export default function TransactionsPage() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
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
        const token = getCookie("accessToken");
        if (!token) throw new Error("로그인 토큰 없음");

        const wallet = await fetchWalletInfo(token as string);
        setWalletInfo(wallet);
      } catch (error) {
        console.error("지갑 정보 로드 실패:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = getCookie("accessToken");
        if (!token) throw new Error("토큰 없음");

        const response = await fetch(`${API_URL}/api/wallet/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        if (data?.isSuccess) {
          setTransactions(data.result);
        } else {
          alert("거래내역 조회 실패: " + (data?.message || "알 수 없는 오류"));
        }
      } catch (error) {
        console.error("거래내역 조회 오류:", error);
        alert("거래내역 불러오기 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((tx: any) => {
    if (
      searchTerm &&
      !tx.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (type !== "전체") {
      const typeMap: Record<string, string> = {
        결제: "PAYMENT",
        충전: "CHARGE",
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

    if (date) {
      const txDate = new Date(tx.createdAt);
      if (txDate.toDateString() !== date.toDateString()) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">거래내역을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Header title="거래내역" />

      <div className="p-4 bg-white shadow-sm">
        <div className="flex gap-2 mb-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <Calendar
            selected={date}
            onSelect={setDate}
            onResetFilters={handleResetFilters}
          />
        </div>

        <div className="flex gap-2">
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

      <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl">
        <TransactionList transactions={filteredTransactions} />
      </div>
    </div>
  );
}

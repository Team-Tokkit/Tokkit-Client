"use client";

import { useState } from "react";
import { transactions } from "@/data/wallet/wallet";
import WalletHeader from "@/components/wallet/common/WalletHeader";
import SearchBar from "@/components/wallet/totalhistory/SearchBar";
import Category from "@/components/wallet/totalhistory/Category";
import Calendar from "@/components/wallet/totalhistory/Calendar";
import TransactionList from "@/components/wallet/common/TransactionList";

export default function TransactionsPage() {
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
    { label: "충전", value: "충전" },
    { label: "전환", value: "전환" },
  ];

  const periodOptions = [
    { label: "전체 기간", value: "전체 기간" },
    { label: "최근 1주일", value: "week" },
    { label: "최근 1개월", value: "month" },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    if (
      searchTerm &&
      !tx.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (type !== "전체" && tx.type !== type) return false;

    if (period !== "all") {
      const txDate = new Date(tx.date.replace(" ", "T"));
      const today = new Date();
      const diff = today.getTime() - txDate.getTime();

      if (period === "week" && diff > 7 * 86400000) return false;
      if (period === "month" && diff > 30 * 86400000) return false;
    }

    if (date) {
      const txDate = new Date(tx.date.replace(" ", "T"));
      if (txDate.toDateString() !== date.toDateString()) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <WalletHeader title="거래내역" />

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

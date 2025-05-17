"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import TransactionCardContent from "@/app/wallet/components/common/TransactionCardContent";
import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

interface TransactionDetail {
  id: number;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
}

export default function TransactionDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : undefined;

  const [transaction, setTransaction] = useState<TransactionDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchTransactionDetail = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/wallet/transactions/${id}`
        );
        const data = await response.json();
        if (data.isSuccess) {
          setTransaction(data.result);
        } else {
          console.error("거래내역 조회 실패:", data.message ?? "서버 오류");
        }
      } catch (error) {
        console.error("거래내역 조회 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <p className="text-gray-500">거래내역을 불러오는 중...</p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <p className="text-gray-500">거래내역을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const isNegative = transaction.amount < 0;
  const formattedAmount = `${isNegative ? "" : "+"}${Math.abs(
    transaction.amount
  ).toLocaleString()}원`;

  const date = new Date(transaction.createdAt);
  const formattedDate = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;

  const hours = date.getHours();
  const ampm = hours < 12 ? "오전" : "오후";
  const displayHours = hours % 12 || 12;
  const formattedTime = `${ampm} ${displayHours}:${String(
    date.getMinutes()
  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  const getKoreanType = (type: string) => {
    switch (type) {
      case "PAYMENT":
        return "결제";
      case "CONVERT":
        return "변환";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col px-4">
      <Header title="상세 내역" />

      <motion.div
        className="bg-white rounded-xl px-6 py-6 mb-4 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TransactionCardContent
          description={transaction.description}
          amount={transaction.amount}
          createdAt={transaction.createdAt}
        />
      </motion.div>

      <motion.div
        className="bg-white rounded-xl px-6 py-6 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4">거래 정보</h2>

        <div className="flex justify-between py-4 border-b border-gray-100">
          <div className="text-gray-500">거래 유형</div>
          <div className="font-medium">{getKoreanType(transaction.type)}</div>
        </div>

        <div className="flex justify-between py-4">
          <div className="text-gray-500">거래 설명</div>
          <div className="font-medium">{transaction.description}</div>
        </div>
      </motion.div>

      <div className="mt-6" />

      <motion.div
        className="bg-white rounded-xl px-6 py-6 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-lg font-bold mb-4">시간 정보</h2>

        <div className="flex justify-between py-4 border-b border-gray-100">
          <div className="text-gray-500">거래 일자</div>
          <div className="font-medium">{formattedDate}</div>
        </div>

        <div className="flex justify-between py-4">
          <div className="text-gray-500">거래 시간</div>
          <div className="font-medium">{formattedTime}</div>
        </div>
      </motion.div>
    </div>
  );
}

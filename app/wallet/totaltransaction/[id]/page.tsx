"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import TransactionCardContent from "@/app/wallet/components/common/TransactionCardContent";
import {fetchTransactionDetail} from "@/app/wallet/api/fetch-transactions-detail";
import Link from "next/link";


interface TransactionDetail {
    id: number;
    type: string;
    amount: number;
    displayDescription: string;
    createdAt: string;
    txHash: string;
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

        fetchTransactionDetail(id)
            .then((data) => {
                setTransaction(data);
            })
            .catch((error) => {
                console.error("거래내역 조회 오류:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);


    if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col px-4">
        <Header title="상세 내역" />

        {/* Transaction Card Skeleton */}
        <motion.div
          className="bg-white rounded-xl px-6 py-6 mb-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
            <div className="text-right">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-1 w-20"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </div>
        </motion.div>

        {/* Transaction Info Skeleton */}
        <motion.div
          className="bg-white rounded-xl px-6 py-6 mb-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-20"></div>

          <div className="flex justify-between py-4 border-b border-gray-100">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
          </div>

          <div className="flex justify-between py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
        </motion.div>

        {/* Time Info Skeleton */}
        <motion.div
          className="bg-white rounded-xl px-6 py-6 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-20"></div>

          <div className="flex justify-between py-4 border-b border-gray-100">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>

          <div className="flex justify-between py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          </div>
        </motion.div>
      </div>
    )
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
            case "PURCHASE":
                return "구매";
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
                    displayDescription={transaction.displayDescription}
                    amount={transaction.amount}
                    createdAt={transaction.createdAt}
                    type={transaction.type}
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

                    {transaction.txHash ? ( // txHash가 존재하는 경우만 렌더링
                        <Link
                            href={`/wallet/blockchain-details/${transaction.txHash}`}
                            className="text-[#FFB020] underline hover:text-[#f29d00] transition-colors duration-150"
                        >
                            {transaction.txHash.slice(0, 10)}...{transaction.txHash.slice(-6)} 🔗
                        </Link>
                    ) : (
                        <div className="text-gray-400">연결 정보 없음</div> // fallback UI
                    )}
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

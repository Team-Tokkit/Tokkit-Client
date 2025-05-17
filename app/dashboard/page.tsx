"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchWalletInfo } from "@/app/dashboard/api/wallet-info";
import { getApiUrl } from "@/lib/getApiUrl";
import { getCookie } from "@/lib/cookies";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import HeaderSection from "@/app/dashboard/components/DashboardHeader";
import WalletCard from "./components/WalletCard";
import QuickMenu from "@/app/dashboard/components/QuickMenu";
import NoticesSection from "@/app/dashboard/components/NoticeSection";
import FloatingPaymentButton from "@/app/dashboard/components/PaymentButton";
import TransactionList from "@/components/common/TransactionList";

const API_URL = getApiUrl();

interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isNew: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentNotice, setCurrentNotice] = useState(0);
  const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [walletInfo, setWalletInfo] = useState<{
    name: string;
    accountNumber: string;
    tokenBalance: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    const accessToken = getCookie("accessToken");
    if (!accessToken) return;

    fetchWalletInfo(accessToken)
      .then((data) => {
        setWalletInfo(data);
      })
      .catch((err) => {
        console.error("지갑 정보 로딩 실패:", err);
      });

    const startNoticeSlide = () => {
      if (notices.length === 0) return;
      noticeSlideTimerRef.current = setInterval(() => {
        setCurrentNotice((prev) => (prev + 1) % notices.length);
      }, 4000);
    };

    startNoticeSlide();

    return () => {
      if (noticeSlideTimerRef.current) {
        clearInterval(noticeSlideTimerRef.current);
      }
    };
  }, [notices.length]);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return;

    fetch(`${API_URL}/api/notice?page=0`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const raw = data.result.content || [];
        const now = new Date();

        const formattedNotices = raw.map((n: any) => {
          const createdAt = new Date(n.createdAt);
          const diffInDays =
            (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

          return {
            id: n.id,
            title: n.title,
            content: n.content,
            createdAt: n.createdAt,
            isNew: diffInDays <= 3,
          };
        });

        setNotices(formattedNotices.slice(0, 3));
      })
      .catch((err) => {
        console.error("공지사항 로딩 실패:", err);
      });
  }, []);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const token = getCookie("accessToken");
        if (!token) throw new Error("토큰 없음");

        const response = await fetch(`${API_URL}/api/wallet/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data?.isSuccess) {
          setRecentTransactions(data.result.slice(0, 3));
        } else {
          console.error(
            "거래내역 조회 실패:",
            data.message || "알 수 없는 오류"
          );
        }
      } catch (error) {
        console.error("거래내역 조회 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTransactions();
  }, []);

  const handleNoticeChange = (index: number) => {
    if (notices.length === 0) return;

    setCurrentNotice(index);

    if (noticeSlideTimerRef.current) {
      clearInterval(noticeSlideTimerRef.current);
    }

    noticeSlideTimerRef.current = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length);
    }, 4000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col max-w-md mx-auto">
      <HeaderSection />
      <WalletCard
        userName={walletInfo?.name ?? ""}
        accountNumber={walletInfo?.accountNumber ?? ""}
        tokenBalance={walletInfo?.tokenBalance ?? 0}
      />
      <div className="flex-1 flex flex-col p-5 px-6 pt-8 pb-24">
        <QuickMenu />

        <h3 className="text-sm font-medium text-[#111827] flex items-center mb-4">
          <span className="bg-gradient-to-r from-[#4F6EF7] to-[#3A5BD9] w-1 h-4 rounded-full mr-2 inline-block"></span>
          최근 거래 내역
        </h3>
        <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl mb-8">
          {loading ? (
            <p className="text-sm text-gray-400">최근 거래를 불러오는 중...</p>
          ) : (
            <TransactionList
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

        <NoticesSection
          notices={notices}
          currentNotice={currentNotice}
          onNoticeChange={handleNoticeChange}
        />
      </div>
      <FloatingPaymentButton />
    </div>
  );
}
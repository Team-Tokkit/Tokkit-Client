"use client"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import {MerchantHeader} from "@/app/merchant/dashboard/components/MerchantHeader";
import {WalletCard} from "@/app/merchant/dashboard/components/WalletCard";
import {SalesStatistics} from "@/app/merchant/dashboard/components/SalesStatistics";
import {VoucherSearch} from "@/app/merchant/dashboard/components/VoucherSearch";
import {fetchMerchantWalletInfo} from "@/app/merchant/dashboard/api/merchant-wallet-info";
import {fetchDailyIncome} from "@/app/merchant/dashboard/api/daily-income";
import {fetchMerchantRecentTransactions, MerchantTransaction} from "./api/merchant-recent-transactions";
import MerchantRecentTransaction from "@/app/merchant/dashboard/components/MerchantRecentTransaction";
import NoticesSection from "@/app/merchant/dashboard/components/NoticeSection";
import { fetchNoticePreview, NoticePreview } from "@/app/dashboard/api/fetch-notice-preview"

// 공지사항 데이터 타입 정의
interface Notice {
    id: string
    title: string
    content: string
    date: string
    isEvent: boolean
    isNew: boolean
}

export default function MerchantDashboardPage() {
    const isMobile = useMobile()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [dailyIncome, setDailyIncome] = useState<{
        dailyIncome: number;
    }>({ dailyIncome: 0 })
    const [recentMerchantTransactions, setRecentMerchantTransactions] = useState<MerchantTransaction[]>([])
    const [currentNotice, setCurrentNotice] = useState(0)
    const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [walletInfo, setWalletInfo] = useState<{
        storeName: string;
        accountNumber: string;
        tokenBalance: number;
        depositBalance: number;
    } | null>(null)
    const [notices, setNotices] = useState<NoticePreview[]>([])

    useEffect(() => {
        setMounted(true);

        fetchMerchantWalletInfo()
            .then((data) => {
                setWalletInfo(data);
            })
            .catch((err) => {
                console.error("지갑 정보 로딩 실패:", err);
            });

        fetchDailyIncome()
            .then((data) => {
                setDailyIncome(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("일일 통계 로딩 실패:", err);
            });

        fetchMerchantRecentTransactions(3)
            .then(setRecentMerchantTransactions)
            .catch((err) => {
                console.error("거래내역 조회 실패:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    // 공지사항 자동 슬라이드 설정
    useEffect(() => {
        const startNoticeSlide = () => {
            noticeSlideTimerRef.current = setInterval(() => {
                setCurrentNotice((prev) => (prev + 1) % notices.length)
            }, 4000) // 4초마다 슬라이드
        }

        startNoticeSlide()

        return () => {
            if (noticeSlideTimerRef.current) {
                clearInterval(noticeSlideTimerRef.current)
            }
        }
    }, [notices.length])

    useEffect(() => {
        fetchNoticePreview(3)
            .then(setNotices)
            .catch((err) => {
                console.error("공지사항 로딩 실패:", err);
            });
    }, []);

    // 수동으로 공지사항 변경 시 타이머 재설정
    const handleNoticeChange = (index: number) => {
        setCurrentNotice(index)

        if (noticeSlideTimerRef.current) {
            clearInterval(noticeSlideTimerRef.current)
        }

        noticeSlideTimerRef.current = setInterval(() => {
            setCurrentNotice((prev) => (prev + 1) % notices.length)
        }, 4000)
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
            {/* 헤더 */}
            <MerchantHeader />

            {/* 메인 컨텐츠 */}
            <div className="flex-1 p-5 pb-8 space-y-5 -mt-6">
                {/* 전자지갑 카드 */}
                <WalletCard
                    storeName={walletInfo?.storeName ?? ''}
                    accountNumber={walletInfo?.accountNumber ?? ''}
                    tokenBalance={walletInfo?.tokenBalance ?? 0}
                    depositBalance={walletInfo?.depositBalance ?? 0}
                    isLoading={!walletInfo}
                    onClick={() => router.push("/merchant/wallet")}
                    onConvertClick={() => router.push("/merchant/wallet/convert")}
                />

                {/* 매출 통계 카드 */}
                <SalesStatistics
                    dailyIncome={dailyIncome.dailyIncome}
                    isLoading={isLoading}
                />

                {/* 바우처 조회 */}
                <VoucherSearch />

                {/* 최근 거래내역 조회 */}
                <MerchantRecentTransaction
                    transactions={recentMerchantTransactions}
                    loading={loading}
                />

                {/* 공지사항 */}
                <NoticesSection
                    notices={notices}
                    currentNotice={currentNotice}
                    onNoticeChange={handleNoticeChange}
                />
            </div>
        </div>
    )
}

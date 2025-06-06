"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { fetchWalletInfo } from "@/app/dashboard/api/wallet-info"
import { fetchRecentTransactions } from "@/app/dashboard/api/fetch-recent-transactions"
import { fetchNoticePreview, NoticePreview } from "@/app/dashboard/api/fetch-notice-preview"
import type { Transaction as ApiTransaction } from "@/app/dashboard/api/fetch-recent-transactions"
import { Transaction } from "@/app/wallet/api/fetch-transactions"

import HeaderSection from "@/app/dashboard/components/DashboardHeader"
import WalletCard from "./components/WalletCard"
import WalletCardSkeleton from "@/app/dashboard/loading/WalletCardSkeleton"
import QuickMenu from "@/app/dashboard/components/QuickMenu"
import TransactionList from "@/app/wallet/components/common/TransactionList"
import TransactionListSkeleton from "@/app/dashboard/loading/TransactionListSkeleton"
import NoticesSection from "@/app/dashboard/components/NoticeSection"
import NoticesSkeleton from "@/app/dashboard/loading/NoticeSkeleton"
import NotificationToast from "@/components/common/NotificationToast"
import AutoConvertSummaryCard from "@/app/dashboard/components/AutoConvertSummaryCard"
import FloatingPaymentButton from "@/app/dashboard/components/PaymentButton"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useSse } from "@/components/common/SseProvider"

export default function DashboardPage() {
    const router = useRouter()

    // 상태 정의
    const [loading, setLoading] = useState(true)
    const [walletInfo, setWalletInfo] = useState<{ name: string; accountNumber: string; tokenBalance: number } | null>(null)
    const [recentTransactions, setRecentTransactions] = useState<ApiTransaction[]>([])
    const [notices, setNotices] = useState<NoticePreview[]>([])
    const [currentNotice, setCurrentNotice] = useState(0)
    const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)

    // Toast 관련 상태
    const [toastVisible, setToastVisible] = useState(false)
    const [toastMessage, setToastMessage] = useState({ title: "", content: "" })

    // SSE 알림
    const { notification } = useSse()

    // Toast 출력 함수
    const showToast = useCallback((title: string, content: string) => {
        setToastMessage({ title, content })
        setToastVisible(true)
        setTimeout(() => setToastVisible(false), 4000)
    }, [])

    // 데이터 갱신 함수 (지갑정보 + 최근 거래내역)
    const refreshData = useCallback(async () => {
        try {
            const [walletData, txnData] = await Promise.all([
                fetchWalletInfo(),
                fetchRecentTransactions(3),
            ])
            setWalletInfo(walletData)
            setRecentTransactions(txnData)
        } catch (err) {
            console.error("데이터 갱신 실패:", err)
        }
    }, [])

    // 알림 도착 시 Toast와 함께 데이터 갱신
    useEffect(() => {
        if (!notification) return
        showToast(notification.title, notification.content)
        const timer = setTimeout(() => {
            refreshData()
        }, 10000) // 1초 지연 시간을 주고 최신 상태 반영
        return () => clearTimeout(timer)
    }, [notification, showToast, refreshData])

    // 초기 로딩
    useEffect(() => {
        refreshData().finally(() => setLoading(false))
    }, [refreshData])

    // 공지사항 로딩
    useEffect(() => {
        fetchNoticePreview(3)
            .then(setNotices)
            .catch((err) => {
                console.error("공지사항 로딩 실패:", err)
            })
    }, [])

    // 공지사항 자동 슬라이드
    useEffect(() => {
        if (notices.length === 0) return
        noticeSlideTimerRef.current = setInterval(() => {
            setCurrentNotice((prev) => (prev + 1) % notices.length)
        }, 4000)
        return () => {
            if (noticeSlideTimerRef.current) clearInterval(noticeSlideTimerRef.current)
        }
    }, [notices.length])

    // 공지 수동 선택 시 타이머 재설정
    const handleNoticeChange = (index: number) => {
        if (notices.length === 0) return
        setCurrentNotice(index)
        if (noticeSlideTimerRef.current) clearInterval(noticeSlideTimerRef.current)
        noticeSlideTimerRef.current = setInterval(() => {
            setCurrentNotice((prev) => (prev + 1) % notices.length)
        }, 4000)
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
            <HeaderSection />
            <div className="flex-1 p-4 pb-8 space-y-5 -mt-8">
                <div className="pb-5">
                    {walletInfo ? (
                        <WalletCard
                            userName={walletInfo.name}
                            accountNumber={walletInfo.accountNumber}
                            tokenBalance={walletInfo.tokenBalance}
                        />
                    ) : (
                        <WalletCardSkeleton />
                    )}
                </div>
                <AutoConvertSummaryCard />
                <QuickMenu />

                {/* 거래내역 */}
                <h3 className="text-sm font-medium text-[#111827] flex items-center mb-4">
                    <span className="bg-gradient-to-r from-[#4F6EF7] to-[#3A5BD9] w-1 h-4 rounded-full mr-2 inline-block"></span>
                    최근 거래 내역
                </h3>
                <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl mb-8">
                    {loading ? (
                        <TransactionListSkeleton count={3} />
                    ) : (
                        <TransactionList
                            transactions={recentTransactions.map((t) => ({
                                ...t,
                                displayDescription: t.displayDescription || "",
                            })) as Transaction[]}
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

                {/* 공지사항 */}
                <div className="pb-8">
                    {notices.length > 0 ? (
                        <NoticesSection
                            notices={notices}
                            currentNotice={currentNotice}
                            onNoticeChange={handleNoticeChange}
                        />
                    ) : (
                        <NoticesSkeleton />
                    )}
                </div>
            </div>

            <FloatingPaymentButton />
            <NotificationToast
                title={toastMessage.title}
                content={toastMessage.content}
                visible={toastVisible}
            />
        </div>
    )
}

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { EventSourcePolyfill } from "event-source-polyfill"
import { getCookie } from "@/lib/cookies"
import { getApiUrl } from "@/lib/getApiUrl"
import NotificationToast from "@/components/common/NotificationToast"

import { MerchantHeader } from "@/app/merchant/dashboard/components/MerchantHeader"
import { WalletCard } from "@/app/merchant/dashboard/components/WalletCard"
import WalletCardSkeleton from "@/app/merchant/dashboard/components/WalletCardSkeleton"
import { SalesStatistics } from "@/app/merchant/dashboard/components/SalesStatistics"
import { VoucherSearch } from "@/app/merchant/dashboard/components/VoucherSearch"
import { fetchMerchantWalletInfo } from "@/app/merchant/dashboard/api/merchant-wallet-info"
import { fetchDailyIncome } from "@/app/merchant/dashboard/api/daily-income"
import { fetchMerchantRecentTransactions, MerchantTransaction } from "./api/merchant-recent-transactions"
import MerchantRecentTransaction from "@/app/merchant/dashboard/components/MerchantRecentTransaction"
import NoticesSection from "@/app/merchant/dashboard/components/NoticeSection"
import { fetchNoticePreview, NoticePreview } from "@/app/merchant/dashboard/api/fetch-merchant-notice-preview"
import NoticesSkeleton from "@/app/dashboard/loading/NoticeSkeleton"

export default function MerchantDashboardPage() {
    const isMobile = useMobile()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [dailyIncome, setDailyIncome] = useState({ dailyIncome: 0 })
    const [recentMerchantTransactions, setRecentMerchantTransactions] = useState<MerchantTransaction[]>([])
    const [currentNotice, setCurrentNotice] = useState(0)
    const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [walletInfo, setWalletInfo] = useState<{
        storeName: string
        accountNumber: string
        tokenBalance: number
        depositBalance: number
    } | null>(null)
    const [notices, setNotices] = useState<NoticePreview[]>([])

    const [toastVisible, setToastVisible] = useState(false)
    const [toastMessage, setToastMessage] = useState({ title: "", content: "" })
    const eventSourceRef = useRef<EventSourcePolyfill | null>(null)

    const showToast = useCallback((title: string, content: string) => {
        setToastMessage({ title, content })
        setToastVisible(true)
        setTimeout(() => setToastVisible(false), 4000)
    }, [])

    useEffect(() => {
        const API_URL = getApiUrl()
        const accessToken = getCookie("accessToken")
        if (!accessToken) return

        if (eventSourceRef.current) {
            eventSourceRef.current.close()
            eventSourceRef.current = null
        }

        const eventSource = new EventSourcePolyfill(`${API_URL}/api/merchants/notifications/subscribe`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: false,
            heartbeatTimeout: 60000,
        })

        eventSource.addEventListener("notification", (event) => {
            try {
                const { title, content } = JSON.parse((event as MessageEvent).data)
                showToast(title, content)
            } catch (e) {
                console.error("❗ 알림 파싱 오류", e)
            }
        })

        eventSource.addEventListener("connect", (event) => {
            console.log("✅ SSE 연결 완료:", (event as MessageEvent).data)
        })

        eventSource.onerror = (err) => {
            console.error("❌ SSE 오류:", err)
            eventSource.close()
            eventSourceRef.current = null
        }

        eventSourceRef.current = eventSource

        return () => {
            eventSourceRef.current?.close()
            eventSourceRef.current = null
        }
    }, [showToast])

    useEffect(() => {
        setMounted(true)

        fetchMerchantWalletInfo()
            .then(setWalletInfo)
            .catch((err) => console.error("지갑 정보 로딩 실패:", err))

        fetchDailyIncome()
            .then((data) => {
                setDailyIncome(data)
                setIsLoading(false)
            })
            .catch((err) => console.error("일일 통계 로딩 실패:", err))

        fetchMerchantRecentTransactions(3)
            .then(setRecentMerchantTransactions)
            .catch((err) => console.error("거래내역 조회 실패:", err))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        fetchNoticePreview(3)
            .then(setNotices)
            .catch((err) => console.error("공지사항 로딩 실패:", err))
    }, [])

    useEffect(() => {
        const startNoticeSlide = () => {
            noticeSlideTimerRef.current = setInterval(() => {
                setCurrentNotice((prev) => (prev + 1) % notices.length)
            }, 4000)
        }

        startNoticeSlide()

        return () => {
            if (noticeSlideTimerRef.current) {
                clearInterval(noticeSlideTimerRef.current)
            }
        }
    }, [notices.length])

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
            <MerchantHeader />

            <div className="flex-1 p-5 pb-8 space-y-5 -mt-6">
                {!walletInfo ? (
                    <WalletCardSkeleton />
                ) : (
                    <WalletCard
                        storeName={walletInfo.storeName}
                        accountNumber={walletInfo.accountNumber}
                        tokenBalance={walletInfo.tokenBalance}
                        depositBalance={walletInfo.depositBalance}
                        isLoading={false}
                        onClick={() => router.push("/merchant/wallet")}
                        onConvertClick={() => router.push("/merchant/wallet/convert")}
                    />
                )}

                <SalesStatistics
                    dailyIncome={dailyIncome.dailyIncome}
                    isLoading={isLoading}
                />

                <VoucherSearch />

                <MerchantRecentTransaction
                    transactions={recentMerchantTransactions}
                    loading={loading}
                />

                {notices.length == 0 ? (
                    <NoticesSkeleton />
                ) : (
                    <NoticesSection
                        notices={notices}
                        currentNotice={currentNotice}
                        onNoticeChange={handleNoticeChange}
                    />
                )}
            </div>

            <NotificationToast
                title={toastMessage.title}
                content={toastMessage.content}
                visible={toastVisible}
            />
        </div>
    )
}

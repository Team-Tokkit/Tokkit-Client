"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { fetchWalletInfo } from "@/app/dashboard/api/wallet-info"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

import HeaderSection from "@/app/dashboard/components/DashboardHeader"
import WalletCard from "./components/WalletCard"
import QuickMenu from "@/app/dashboard/components/QuickMenu"
import NoticesSection from "@/app/dashboard/components/NoticeSection"
import FloatingPaymentButton from "@/app/dashboard/components/PaymentButton"
import TransactionList from "@/app/wallet/components/common/TransactionList"
import { fetchNoticePreview, type NoticePreview } from "@/app/dashboard/api/fetch-notice-preview"
import type { Transaction as ApiTransaction } from "@/app/dashboard/api/fetch-recent-transactions"
import { fetchRecentTransactions } from "@/app/dashboard/api/fetch-recent-transactions"
import type { Transaction } from "@/app/wallet/api/fetch-transactions"
import { EventSourcePolyfill } from "event-source-polyfill"
import { getCookie } from "@/lib/cookies"
import { getApiUrl } from "@/lib/getApiUrl"
import NotificationToast from "@/components/common/NotificationToast"
import WalletCardSkeleton from "@/app/dashboard/loading/WalletCardSkeleton"
import TransactionListSkeleton from "@/app/dashboard/loading/TransactionListSkeleton"
import NoticesSkeleton from "@/app/dashboard/loading/NoticeSkeleton"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [recentTransactions, setRecentTransactions] = useState<ApiTransaction[]>([])
  const [mounted, setMounted] = useState(false)
  const [currentNotice, setCurrentNotice] = useState(0)
  const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [notices, setNotices] = useState<NoticePreview[]>([])
  const [walletInfo, setWalletInfo] = useState<{
    name: string
    accountNumber: string
    tokenBalance: number
  } | null>(null)

  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", content: "" })

  const showToast = useCallback((title: string, content: string) => {
    setToastMessage({ title, content })
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }, [])

  useEffect(() => {
    const API_URL = getApiUrl()
    const accessToken = getCookie("accessToken")
    if (!accessToken) return

    const eventSource = new EventSourcePolyfill(`${API_URL}/api/users/notifications/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: false,
      heartbeatTimeout: 60000,
    })

    eventSource.addEventListener("notification", (event) => {
      try {
        const { title, content } = JSON.parse((event as MessageEvent).data)
        console.log("📥 알림 수신:", title, content)
        showToast(title, content)
      } catch (e) {
        console.error("알림 파싱 오류", e)
      }
    })

    eventSource.onerror = (err) => {
      console.error("SSE 오류:", err)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [showToast])

  useEffect(() => {
    setMounted(true)

    fetchWalletInfo()
      .then((data) => {
        setWalletInfo(data)
      })
      .catch((err) => {
        console.error("지갑 정보 로딩 실패:", err)
      })

    const startNoticeSlide = () => {
      if (notices.length === 0) return
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

  useEffect(() => {
    fetchNoticePreview(3)
      .then(setNotices)
      .catch((err) => {
        console.error("공지사항 로딩 실패:", err)
      })
  }, [])

  useEffect(() => {
    fetchRecentTransactions(3)
      .then(setRecentTransactions)
      .catch((err) => {
        console.error("거래내역 조회 실패:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleNoticeChange = (index: number) => {
    if (notices.length === 0) return

    setCurrentNotice(index)

    if (noticeSlideTimerRef.current) {
      clearInterval(noticeSlideTimerRef.current)
    }

    noticeSlideTimerRef.current = setInterval(() => {
      setCurrentNotice((prev) => (prev + 1) % notices.length)
    }, 4000)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <HeaderSection />

      {/* 메인 컨텐츠 */}
      <div className="flex-1 p-4 pb-8 space-y-5 -mt-8">
        {/* 전자지갑 */}
        <div className="pb-5">
          {!walletInfo ? (
            <WalletCardSkeleton />
          ) : (
            <WalletCard
              userName={walletInfo.name}
              accountNumber={walletInfo.accountNumber}
              tokenBalance={walletInfo.tokenBalance}
            />
          )}
        </div>

        {/* 빠른 메뉴 */}
        <QuickMenu />
        <h3 className="text-sm font-medium text-[#111827] flex items-center mb-4">
          <span className="bg-gradient-to-r from-[#4F6EF7] to-[#3A5BD9] w-1 h-4 rounded-full mr-2 inline-block"></span>
          최근 거래 내역
        </h3>
        <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl mb-8">
          {loading ? (
            <TransactionListSkeleton count={3} />
          ) : (
            <TransactionList
              transactions={
                recentTransactions.map((t) => ({
                  ...t,
                  displayDescription: t.displayDescription || "",
                })) as Transaction[]
              }
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
        <div className="pb-8">
          {notices.length === 0 ? (
            <NoticesSkeleton />
          ) : (
            <NoticesSection notices={notices} currentNotice={currentNotice} onNoticeChange={handleNoticeChange} />
          )}
        </div>
      </div>
      <div>
        <FloatingPaymentButton />
      </div>
      <NotificationToast title={toastMessage.title} content={toastMessage.content} visible={toastVisible} />
    </div>
  )
}

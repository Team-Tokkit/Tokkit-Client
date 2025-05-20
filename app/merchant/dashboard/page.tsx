"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, ChevronRight, Wallet, Bell, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {MerchantHeader} from "@/app/merchant/dashboard/components/MerchantHeader";
import {WalletCard} from "@/app/merchant/dashboard/components/WalletCard";
import {SalesStatistics} from "@/app/merchant/dashboard/components/SalesStatistics";
import {VoucherSearch} from "@/app/merchant/dashboard/components/VoucherSearch";
import {NoticeSlider} from "@/app/merchant/dashboard/components/NoticeSlider";

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
    const [isLoading, setIsLoading] = useState(true)
    const [walletBalance, setWalletBalance] = useState(0)
    const [tokenBalance, setTokenBalance] = useState(0)
    const [depositBalance, setDepositBalance] = useState(0)
    const [todayTotal, setTodayTotal] = useState(0)
    const [weeklyTotal, setWeeklyTotal] = useState(0)
    const [monthlyTotal, setMonthlyTotal] = useState(0)
    const [currentNotice, setCurrentNotice] = useState(0)
    const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)

    // 공지사항 데이터
    const notices: Notice[] = [
        {
            id: "1",
            title: "가맹점 정산 일정 안내",
            content: "2023년 9월 정산은 10월 5일에 진행될 예정입니다. 정산 관련 문의는 고객센터로 연락 부탁드립니다.",
            date: "2023.09.28",
            isEvent: false,
            isNew: true,
        },
        {
            id: "2",
            title: "추석 맞이 특별 프로모션",
            content: "추석을 맞이하여 토큰 결제 시 5% 추가 적립 이벤트를 진행합니다. 많은 참여 바랍니다!",
            date: "2023.09.20",
            isEvent: true,
            isNew: true,
        },
        {
            id: "3",
            title: "가맹점 앱 업데이트 안내",
            content: "9월 15일부터 새로운 버전의 가맹점 앱이 배포됩니다. 원활한 서비스 이용을 위해 업데이트 부탁드립니다.",
            date: "2023.09.10",
            isEvent: false,
            isNew: false,
        },
    ]

    // 데이터 로딩 시뮬레이션
    useEffect(() => {
        const timer = setTimeout(() => {
            // 지갑 잔액 설정
            setWalletBalance(Math.floor(Math.random() * 500000) + 100000)
            setTokenBalance(Math.floor(Math.random() * 5000) + 1000)
            setDepositBalance(Math.floor(Math.random() * 1000000) + 500000)

            // 오늘/주간/월간 매출 계산
            setTodayTotal(Math.floor(Math.random() * 200000) + 50000)
            setWeeklyTotal(Math.floor(Math.random() * 1000000) + 300000)
            setMonthlyTotal(Math.floor(Math.random() * 5000000) + 1000000)

            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
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
            {/* 헤더 - 가맹점 정보 */}
            <MerchantHeader storeName="행복마트 강남점" unreadNotificationCount={3} />

            {/* 메인 컨텐츠 */}
            <div className="flex-1 p-5 pb-8 space-y-5">
                {/* 전자지갑 카드 - 사용자 대시보드와 동일한 디자인 */}
                <WalletCard
                    storeName="행복마트 강남점"
                    accountNumber="우리 1020-9564-9584"
                    tokenBalance={tokenBalance}
                    depositBalance={depositBalance}
                    isLoading={isLoading} onManageClick={function (): void {
                        throw new Error("Function not implemented.")
                    }} onConvertClick={function (): void {
                        throw new Error("Function not implemented.")
                    }}                />

                {/* 매출 통계 카드 */}
                <SalesStatistics
                    todayTotal={todayTotal}
                    weeklyTotal={weeklyTotal}
                    monthlyTotal={monthlyTotal}
                    isLoading={isLoading}
                />

                {/* 바우처 조회 */}
                <VoucherSearch />

                {/* 공지사항 */}
                <NoticeSlider notices={notices} />
            </div>
        </div>
    )
}

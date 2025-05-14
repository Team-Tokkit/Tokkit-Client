"use client"

import { useState, useEffect, useRef } from "react"
import HeaderSection from "@/app/dashboard/componenets/DashboardHeader";
import WalletCard from "./componenets/WalletCard";
import QuickMenu from "@/app/dashboard/componenets/QuickMenu";
import RecentTransactions from "@/app/dashboard/componenets/RecentTransactions";
import NoticesSection from "@/app/dashboard/componenets/NoticeSection";
import FloatingPaymentButton from "@/app/dashboard/componenets/PaymentButton";


interface Notice {
    id: string
    title: string
    content: string
    date: string
    isEvent: boolean
    isNew: boolean
}

export default function DashboardPage() {
    const [currentNotice, setCurrentNotice] = useState(0)
    const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [mounted, setMounted] = useState(false)

    const userName = "이정민"

    const notices: Notice[] = [
        {
            id: "1",
            title: "서비스 점검 안내",
            content: "2023년 9월 15일 오전 2시부터 6시까지 서비스 점검이 예정되어 있습니다. 이용에 참고 부탁드립니다.",
            date: "2023.09.10",
            isEvent: false,
            isNew: true,
        },
        {
            id: "2",
            title: "추석 맞이 이벤트",
            content: "추석을 맞이하여 특별 이벤트를 진행합니다. 최대 10만원 캐시백 혜택을 놓치지 마세요!",
            date: "2023.09.08",
            isEvent: true,
            isNew: true,
        },
        {
            id: "3",
            title: "개인정보처리방침 개정 안내",
            content: "2023년 10월 1일부터 개인정보처리방침이 개정됩니다. 자세한 내용은 공지사항을 확인해주세요.",
            date: "2023.09.01",
            isEvent: false,
            isNew: false,
        },
    ]

    const recentTransactions = [
        {
            id: "tx1",
            merchant: "스타벅스 강남점",
            amount: -4500,
            date: "오늘, 14:30",
            icon: "/images/coffee-icon.png",
            color: "#00704A",
        },
        {
            id: "tx2",
            merchant: "토큰 충전",
            amount: 50000,
            date: "오늘, 09:15",
            icon: "/images/token-icon.png",
            color: "#FFB020",
        },
        {
            id: "tx3",
            merchant: "CGV 영화관",
            amount: -12000,
            date: "어제, 19:20",
            icon: "/images/movie-icon.png",
            color: "#E51F20",
        },
    ]

    useEffect(() => {
        setMounted(true)

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

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col max-w-md mx-auto">
            <HeaderSection />
            <WalletCard userName={userName} />
            <div className="flex-1 flex flex-col p-5 px-6 pt-8 pb-24">
                <QuickMenu />
                <RecentTransactions data={recentTransactions} />
                <NoticesSection
                    notices={notices}
                    currentNotice={currentNotice}
                    onNoticeChange={handleNoticeChange}
                />
            </div>
            <FloatingPaymentButton />
        </div>
    )
}

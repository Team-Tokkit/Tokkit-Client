"use client"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {MerchantHeader} from "@/app/merchant/dashboard/components/MerchantHeader";
import {WalletCard} from "@/app/merchant/dashboard/components/WalletCard";
import {SalesStatistics} from "@/app/merchant/dashboard/components/SalesStatistics";
import {VoucherSearch} from "@/app/merchant/dashboard/components/VoucherSearch";
import {NoticeSlider} from "@/app/merchant/dashboard/components/NoticeSlider";
import {fetchMerchantWalletInfo} from "@/app/merchant/dashboard/api/merchant-wallet-info";

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
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [todayTotal, setTodayTotal] = useState(0)
    const [weeklyTotal, setWeeklyTotal] = useState(0)
    const [monthlyTotal, setMonthlyTotal] = useState(0)
    const [currentNotice, setCurrentNotice] = useState(0)
    const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [walletInfo, setWalletInfo] = useState<{
        storeName: string;
        accountNumber: string;
        tokenBalance: number;
        depositBalance: number;
    } | null>(null)

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

    useEffect(() => {
        setMounted(true);

        fetchMerchantWalletInfo()
            .then((data) => {
                setWalletInfo(data);
            })
            .catch((err) => {
                console.error("지갑 정보 로딩 실패:", err);
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
            <div className="flex-1 p-5 pb-8 space-y-5">
                {/* 전자지갑 카드 - 사용자 대시보드와 동일한 디자인 */}
                {walletInfo && (
                    <WalletCard
                        storeName={walletInfo.storeName}
                        accountNumber={walletInfo.accountNumber}
                        tokenBalance={walletInfo.tokenBalance}
                        depositBalance={walletInfo.depositBalance}
                    />
                )}

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

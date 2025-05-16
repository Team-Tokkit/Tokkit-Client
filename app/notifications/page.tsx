"use client"

import { useState, useEffect } from "react"
import { Bell, AlertCircle, CreditCard, Gift, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import NotificationHeader from "@/app/notifications/components/NotificationHeader";
import NotificationTabs from "@/app/notifications/components/NotificationTabs";
import NotificationSkeleton from "@/app/notifications/components/NotificationSkeleton";
import NotificationEmptyState from "@/app/notifications/components/NotificationEmptyState";
import NotificationList from "@/app/notifications/components/NotificationList";

// 알림 타입 정의
type NotificationType = "system" | "payment" | "voucher" | "wallet"

interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    isRead: boolean
    createdAt: string
    status: "active" | "deleted"
}

// 알림 아이콘 컴포넌트
const NotificationIcon = ({ type }: { type: NotificationType }) => {
    switch (type) {
        case "system":
            return <AlertCircle className="h-5 w-5 text-blue-500" />
        case "payment":
            return <CreditCard className="h-5 w-5 text-green-500" />
        case "voucher":
            return <Gift className="h-5 w-5 text-purple-500" />
        case "wallet":
            return <Wallet className="h-5 w-5 text-amber-500" />
        default:
            return <Bell className="h-5 w-5 text-gray-500" />
    }
}

// 알림 카테고리 정보
const categories = [
    { id: "all", label: "전체" },
    { id: "system", label: "시스템" },
    { id: "payment", label: "결제" },
    { id: "voucher", label: "바우처" },
    { id: "wallet", label: "지갑" },
]

export default function NotificationsPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("all")
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // 알림 데이터 가져오기 (실제로는 API 호출)
    useEffect(() => {
        // 실제 구현에서는 API 호출로 대체
        const fetchNotifications = async () => {
            setIsLoading(true)
            try {
                // 임시 데이터
                const mockNotifications: Notification[] = [
                    {
                        id: "1",
                        type: "system",
                        title: "시스템 점검 안내",
                        message: "2023년 8월 15일 오전 2시부터 4시까지 시스템 점검이 예정되어 있습니다.",
                        isRead: false,
                        createdAt: "2023-08-10T10:30:00Z",
                        status: "active",
                    },
                    {
                        id: "2",
                        type: "payment",
                        title: "결제 완료",
                        message: "스타벅스에서 5,800원 결제가 완료되었습니다.",
                        isRead: true,
                        createdAt: "2023-08-09T15:45:00Z",
                        status: "active",
                    },
                    {
                        id: "3",
                        type: "voucher",
                        title: "바우처 만료 예정",
                        message: "문화누리 바우처가 30일 후 만료됩니다. 잔액을 확인해주세요.",
                        isRead: false,
                        createdAt: "2023-08-08T09:20:00Z",
                        status: "active",
                    },
                    {
                        id: "4",
                        type: "wallet",
                        title: "토큰 전환 완료",
                        message: "50,000원이 예금 토큰으로 전환되었습니다.",
                        isRead: true,
                        createdAt: "2023-08-07T14:10:00Z",
                        status: "active",
                    },
                    {
                        id: "5",
                        type: "system",
                        title: "개인정보 이용내역 안내",
                        message: "2023년 상반기 개인정보 이용내역을 확인해주세요.",
                        isRead: true,
                        createdAt: "2023-08-04T09:30:00Z",
                        status: "active",
                    },
                    {
                        id: "6",
                        type: "payment",
                        title: "결제 실패",
                        message: "GS25에서 결제가 실패했습니다. 잔액을 확인해주세요.",
                        isRead: false,
                        createdAt: "2023-08-03T18:20:00Z",
                        status: "active",
                    },
                ]

                setNotifications(mockNotifications)
                setIsLoading(false)
            } catch (error) {
                console.error("알림을 가져오는 중 오류가 발생했습니다:", error)
                setIsLoading(false)
            }
        }

        fetchNotifications()

        // SSE 연결 설정 (실제 구현에서는 서버와 연결)
        const setupSSE = () => {
            try {
                // 실제 구현에서는 EventSource 사용
                // const eventSource = new EventSource('/api/notifications/sse');
                // eventSource.onmessage = (event) => {
                //   const newNotification = JSON.parse(event.data);
                //   setNotifications(prev => [newNotification, ...prev]);
                // };
                // eventSource.onerror = () => {
                //   eventSource.close();
                //   setTimeout(setupSSE, 5000); // 5초 후 재연결 시도
                // };
                // return () => {
                //   eventSource.close();
                // };
            } catch (error) {
                console.error("SSE 연결 중 오류가 발생했습니다:", error)
            }
        }

        setupSSE()
    }, [])

    // 알림 삭제 처리
    const handleDeleteNotification = (id: string) => {
        setNotifications((prev) =>
            prev.map((notification) => (notification.id === id ? { ...notification, status: "deleted" } : notification)),
        )
    }

    // 필터링된 알림 목록
    const filteredNotifications = notifications.filter((notification) => {
        if (notification.status === "deleted") return false
        if (activeTab === "all") return true
        return notification.type === activeTab
    })

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] flex flex-col">
            <NotificationHeader />
            <NotificationTabs activeTab={activeTab} onChange={setActiveTab} />

            <div className="flex-1 p-4">
                {isLoading ? (
                    <NotificationSkeleton />
                ) : filteredNotifications.length === 0 ? (
                    <NotificationEmptyState />
                ) : (
                    <NotificationList notifications={filteredNotifications} onDelete={handleDeleteNotification} />
                )}
            </div>
        </div>
    )
}

"use client"

import { useState, useEffect } from "react"
import { Bell, AlertCircle, CreditCard, Gift, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import NotificationHeader from "@/app/notifications/components/NotificationHeader"
import NotificationTabs from "@/app/notifications/components/NotificationTabs"
import NotificationSkeleton from "@/app/notifications/components/NotificationSkeleton"
import NotificationEmptyState from "@/app/notifications/components/NotificationEmptyState"
import NotificationList from "@/app/notifications/components/NotificationList"
import { fetchNotifications } from "@/app/notifications/api/fetch-notifications"
import { fetchNotificationsByCategory } from "./api/fetch-notifications-category"
import {deleteNotification} from "@/app/notifications/api/delete-notifications";

type NotificationType = "system" | "payment" | "voucher" | "token"

interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    createdAt: string
    deleted: "active" | "deleted"
}

export default function NotificationsPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("all")
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadNotifications = async () => {
            setIsLoading(true)
            try {
                if (activeTab === "all") {
                    const data = await fetchNotifications()
                    setNotifications(data)
                } else {
                    const data = await fetchNotificationsByCategory(activeTab)
                    setNotifications(data)
                }
            } catch (e) {
                console.error("알림 조회 실패", e)
            } finally {
                setIsLoading(false)
            }
        }

        loadNotifications()
    }, [activeTab])


    const handleDeleteNotification = async (id: string) => {
        try {
            await deleteNotification(id);
            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === id ? { ...n, deleted: "deleted" } : n
                )
            );
        } catch (error) {
            console.error("알림 삭제 실패", error);
        }
    };


    const filteredNotifications = notifications.filter((n) => {
        if (n.deleted === "deleted") return false
        if (activeTab === "all") return true
        return n.type === activeTab
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
                    <NotificationList
                        notifications={filteredNotifications}
                        onDelete={handleDeleteNotification}
                    />
                )}
            </div>
        </div>
    )
}

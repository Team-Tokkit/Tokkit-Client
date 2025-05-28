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
import { deleteNotification } from "@/app/notifications/api/delete-notifications"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type NotificationType = "system" | "payment" | "token"

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
    const [openDialogId, setOpenDialogId] = useState<string | null>(null)

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

    const confirmDeleteNotification = async () => {
        if (!openDialogId) return
        try {
            await deleteNotification(openDialogId)
            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === openDialogId ? { ...n, deleted: "deleted" } : n
                )
            )
        } catch (error) {
            console.error("알림 삭제 실패", error)
        } finally {
            setOpenDialogId(null)
        }
    }

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
                        onDelete={(id) => setOpenDialogId(id)}
                    />
                )}
            </div>

            <Dialog open={!!openDialogId} onOpenChange={() => setOpenDialogId(null)}>
                <DialogContent className="bg-white w-5/6 rounded-3xl">
                    <DialogHeader>
                        <DialogTitle>알림을 삭제하시겠습니까?</DialogTitle>
                        <DialogDescription>
                            알림을 삭제한 후에는 복구할 수 없습니다.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpenDialogId(null)}>
                            취소
                        </Button>
                        <Button
                            className="bg-amber-500 text-white hover:bg-amber-600"
                            onClick={confirmDeleteNotification}
                        >
                            삭제
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

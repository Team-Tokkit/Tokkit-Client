"use client"

import { AnimatePresence } from "framer-motion"
import NotificationItem from "./NotificationItem"

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

interface NotificationListProps {
    notifications: Notification[]
    onDelete: (id: string) => void
}

export default function NotificationList({ notifications, onDelete }: NotificationListProps) {
    return (
        <AnimatePresence>
            <div className="flex flex-col gap-3">
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </AnimatePresence>
    )
}

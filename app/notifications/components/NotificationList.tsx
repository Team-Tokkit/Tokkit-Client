"use client"

import { AnimatePresence } from "framer-motion"
import NotificationItem from "./NotificationItem"

type NotificationType = "system" | "payment" | "voucher" | "token"

interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    createdAt: string
    deleted: "active" | "deleted"
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

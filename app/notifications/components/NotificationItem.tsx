"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import NotificationIcon from "./NotificationIcon"

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

interface NotificationItemProps {
    notification: Notification
    onDelete: (id: string) => void
}

export default function NotificationItem({ notification, onDelete }: NotificationItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#1A1A1A] rounded-xl p-4 shadow-sm relative"
        >
            <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                    <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium text-[#1A1A1A] dark:text-white">{notification.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/20"
                    onClick={() => onDelete(notification.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    )
}

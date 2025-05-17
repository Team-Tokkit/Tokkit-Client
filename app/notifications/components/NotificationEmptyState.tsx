"use client"

import { Bell } from "lucide-react"

export default function NotificationEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-full py-12">
            <Bell className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-center">알림이 없습니다.</p>
        </div>
    )
}

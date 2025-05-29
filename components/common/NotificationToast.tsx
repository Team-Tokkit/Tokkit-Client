"use client"

import { useEffect, useState } from "react"
import { Bell, X } from "lucide-react"

interface Props {
    title: string
    content: string
    visible: boolean
}

export default function NotificationToast({ title, content, visible }: Props) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (visible) {
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [visible, title, content])

    useEffect(() => {
        if (!visible) setIsVisible(false)
    }, [visible])

    if (!isVisible) return null

    return (
        <div className="fixed top-4 left-1/2 z-[9999] w-full px-4 sm:px-6 md:px-0 transform -translate-x-1/2 flex justify-center">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-full max-w-md flex items-start space-x-3 animate-fade-in">
                <div className="bg-amber-100 rounded-full p-2">
                    <Bell className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{title}</div>
                    <div className="text-sm text-gray-600 mt-1">{content}</div>
                </div>
                <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setIsVisible(false)}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

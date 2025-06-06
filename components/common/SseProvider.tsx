"use client"

import { useEffect, useRef, createContext, useContext, useState } from "react"
import { EventSourcePolyfill } from "event-source-polyfill"
import { getApiUrl } from "@/lib/getApiUrl"
import { getCookie } from "@/lib/cookies"

interface Notification {
    title: string
    content: string
}

const SseContext = createContext<{
    notification: Notification | null
}>({
    notification: null
})

export const useSse = () => useContext(SseContext)

export function SseProvider({ children }: { children: React.ReactNode }) {
    const [notification, setNotification] = useState<Notification | null>(null)
    const eventSourceRef = useRef<EventSourcePolyfill | null>(null)

    useEffect(() => {
        const accessToken = getCookie("accessToken")

        // 이미 연결된 경우 중복 방지
        if (!accessToken || eventSourceRef.current) {
            return
        }

        const API_URL = getApiUrl()
        const eventSource = new EventSourcePolyfill(`${API_URL}/api/users/notifications/subscribe`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: false,
            heartbeatTimeout: 60000,
        })

        console.log("🔌 [SSE] 연결 시도")

        eventSource.addEventListener("notification", (event) => {
            try {
                const { title, content } = JSON.parse((event as MessageEvent).data)
                console.log("📥 [SSE] 알림 수신:", title, content)
                setNotification({ title, content })
            } catch (e) {
                console.error("❌ 알림 파싱 실패:", e)
            }
        })

        eventSource.addEventListener("connect", (event) => {
            console.log("✅ [SSE] 서버 연결 완료:", (event as MessageEvent).data)
        })

        eventSource.onerror = (err) => {
            console.error("❌ [SSE] 오류 발생:", err)
            eventSource.close()
            eventSourceRef.current = null // 다음 렌더에서 다시 연결 가능
        }

        eventSourceRef.current = eventSource

        return () => {
            console.log("❎ [SSE] 연결 종료")
            eventSourceRef.current?.close()
            eventSourceRef.current = null
        }
    }, []) // ✅ 의존성 없음 — 한 번만 실행됨

    return <SseContext.Provider value={{ notification }}>{children}</SseContext.Provider>
}

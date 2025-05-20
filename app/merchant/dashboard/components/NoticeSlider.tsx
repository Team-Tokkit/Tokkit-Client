import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface Notice {
    id: string
    title: string
    content: string
    date: string
    isEvent: boolean
    isNew: boolean
}

interface NoticeSliderProps {
    notices: Notice[]
}

export function NoticeSlider({ notices }: NoticeSliderProps) {
    const [currentNotice, setCurrentNotice] = useState(0)
    const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null)
    const router = useRouter()

    useEffect(() => {
        const startNoticeSlide = () => {
            noticeSlideTimerRef.current = setInterval(() => {
                setCurrentNotice((prev) => (prev + 1) % notices.length)
            }, 4000)
        }
        startNoticeSlide()
        return () => {
            if (noticeSlideTimerRef.current) {
                clearInterval(noticeSlideTimerRef.current)
            }
        }
    }, [notices.length])

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
        <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <div className="w-1 h-5 bg-[#F43F5E] rounded-full mr-2"></div>
                    <h2 className="text-lg font-bold text-[#1A1A1A]">공지사항</h2>
                </div>
                <Button
                    variant="ghost"
                    className="text-sm text-[#4C6EF5] hover:text-[#364FC7] p-0 h-auto"
                    onClick={() => router.push("/merchant/notices")}
                >
                    <span>전체보기</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={notices[currentNotice].id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => router.push(`/merchant/notices/${notices[currentNotice].id}`)}
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    {notices[currentNotice].isNew && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>}
                                    <h4 className="font-medium text-[#111827] text-sm">{notices[currentNotice].title}</h4>
                                    {notices[currentNotice].isEvent && (
                                        <span className="ml-2 text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">이벤트</span>
                                    )}
                                </div>
                                <span className="text-xs text-[#6B7280]">{notices[currentNotice].date}</span>
                            </div>
                            <p className="text-xs text-[#6B7280] line-clamp-2">{notices[currentNotice].content}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-center p-2 gap-1.5">
                    {notices.map((_, index) => (
                        <button
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                index === currentNotice ? "bg-[#FFB020] w-3" : "bg-gray-300"
                            }`}
                            onClick={() => handleNoticeChange(index)}
                        />
                    ))}
                </div>
            </Card>
        </div>
    )
}

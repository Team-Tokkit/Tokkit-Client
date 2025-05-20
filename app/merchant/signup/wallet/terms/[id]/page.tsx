"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import { motion } from "framer-motion"
import { walletTerms as termsData } from "@/app/merchant/signup/wallet/terms/data/walletTerms"

interface TermContent {
    id: string
    title: string
    content: string
}

export default function TermDetailPage() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const termId = params.id as string
    const [term, setTerm] = useState<TermContent | null>(null)
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const getAgreedTerms = () => {
        const agreedParam = searchParams.get("agreed")
        return agreedParam ? agreedParam.split(",") : []
    }

    useEffect(() => {
        const foundTerm = termsData.find((t) => t.id === termId)
        if (foundTerm) {
            setTerm(foundTerm)
        } else {
            router.push("/merchant/signup/wallet/terms")
        }
    }, [termId, router])

    useEffect(() => {
        const currentRef = contentRef.current

        const checkInitialScroll = () => {
            if (currentRef) {
                const { scrollHeight, clientHeight } = currentRef
                if (scrollHeight <= clientHeight) {
                    setIsScrolledToBottom(true)
                }
            }
        }

        const handleScrollEvent = () => {
            if (currentRef) {
                const { scrollTop, scrollHeight, clientHeight } = currentRef
                if (scrollTop + clientHeight >= scrollHeight * 0.8) {
                    setIsScrolledToBottom(true)
                }
            }
        }

        if (currentRef) {
            if (scrollCheckTimeoutRef.current) {
                clearTimeout(scrollCheckTimeoutRef.current)
            }
            scrollCheckTimeoutRef.current = setTimeout(() => {
                checkInitialScroll()
            }, 300)

            currentRef.addEventListener("scroll", handleScrollEvent)
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScrollEvent)
            }
            if (scrollCheckTimeoutRef.current) {
                clearTimeout(scrollCheckTimeoutRef.current)
            }
        }
    }, [term])

    const handleAgree = () => {
        const agreedTerms = getAgreedTerms()
        const updatedTerms = [...agreedTerms]
        if (!updatedTerms.includes(termId)) {
            updatedTerms.push(termId)
        }
        router.push(`/merchant/signup/wallet/terms?agreed=${updatedTerms.join(",")}`)
    }

    if (!term) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFB020]"></div>
            </div>
        )
    }

    return (
        <motion.div
            className="min-h-screen bg-white flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <header className="p-4 flex items-center border-b border-gray-100">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5 text-[#1A1A1A]" />
                </Button>
                <h1 className="text-xl font-bold text-[#1A1A1A]">{term.title}</h1>
            </header>

            <div className="flex-1 p-4 flex flex-col">
                <div
                    ref={contentRef}
                    className="flex-1 bg-[#F9FAFB] p-6 rounded-xl border border-gray-100 overflow-y-auto whitespace-pre-line text-[#333333] text-sm leading-relaxed"
                    style={{ minHeight: "60vh" }}
                >
                    {term.content}
                </div>

                <motion.div
                    className="mt-4 p-4 bg-white sticky bottom-0"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Button
                        onClick={handleAgree}
                        disabled={!isScrolledToBottom}
                        className={`w-full h-12 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                            isScrolledToBottom
                                ? "bg-[#FFB020] hover:bg-[#FF9500] text-white shadow-md shadow-[#FFB020]/20"
                                : "bg-gray-100 text-gray-400"
                        }`}
                    >
                        {isScrolledToBottom ? (
                            <>
                                <Check className="h-4 w-4" /> 동의합니다
                            </>
                        ) : (
                            "약관을 끝까지 읽어주세요"
                        )}
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}

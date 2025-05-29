"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"
import TermsModal from "@/app/merchant/signup/wallet/terms/components/TermModal"
import TermsCardList from "@/app/merchant/signup/wallet/terms/components/TermsCardList"
import { Term } from "@/app/merchant/signup/wallet/terms/data/walletTerms"

interface Props {
    terms: Term[]
    title?: string
    description?: string
}

export default function TermsAgreementPage({ terms, title = "약관 동의", description = "안전한 서비스 이용을 위해 아래 약관에 동의해주세요." }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [agreedTerms, setAgreedTerms] = useState<string[]>([])
    const [allAgreed, setAllAgreed] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [currentTermIndex, setCurrentTermIndex] = useState<number | null>(null)
    const [viewedTerms, setViewedTerms] = useState<string[]>([])
    const [isAllTermsFlow, setIsAllTermsFlow] = useState(false)
    const initialRenderRef = useRef(true)

    useEffect(() => {
        const agreedParam = searchParams.get("agreed")
        if (agreedParam) setAgreedTerms(agreedParam.split(","))

        const viewedParam = searchParams.get("viewed")
        if (viewedParam) setViewedTerms(viewedParam.split(","))
    }, [searchParams])

    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false
            return
        }
        setAllAgreed(terms.every(term => agreedTerms.includes(term.id)))
    }, [agreedTerms, terms])

    const handleToggleTerm = (termId: string) => {
        if (!viewedTerms.includes(termId)) {
            const idx = terms.findIndex(term => term.id === termId)
            if (idx !== -1) {
                setCurrentTermIndex(idx)
                setIsAllTermsFlow(false)
            }
            return
        }
        setAgreedTerms(prev => prev.includes(termId) ? prev.filter(id => id !== termId) : [...prev, termId])
    }

    const handleToggleAll = () => {
        if (allAgreed) {
            setAgreedTerms([])
        } else {
            const allViewed = terms.every(term => viewedTerms.includes(term.id))
            if (allViewed) {
                setAgreedTerms(terms.map(term => term.id))
            } else {
                setIsAllTermsFlow(true)
                const firstNotViewed = terms.findIndex(term => !viewedTerms.includes(term.id))
                setCurrentTermIndex(firstNotViewed !== -1 ? firstNotViewed : 0)
            }
        }
    }

    const handleViewTerm = (termId: string) => {
        const idx = terms.findIndex(term => term.id === termId)
        if (idx !== -1) {
            setCurrentTermIndex(idx)
            setIsAllTermsFlow(false)
        }
    }

    const handleSubmit = () => {
        const required = terms.filter(term => term.required).map(term => term.id)
        const valid = required.every(termId => agreedTerms.includes(termId))
        if (valid) {
            router.push("/merchant/signup/wallet/verify")
        } else {
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000)
        }
    }

    const handleAgreeCurrentTerm = () => {
        if (currentTermIndex === null) return
        const current = terms[currentTermIndex]
        if (!viewedTerms.includes(current.id)) setViewedTerms(prev => [...prev, current.id])
        if (!agreedTerms.includes(current.id)) setAgreedTerms(prev => [...prev, current.id])

        if (isAllTermsFlow && currentTermIndex < terms.length - 1) {
            setCurrentTermIndex(currentTermIndex + 1)
        } else {
            setCurrentTermIndex(null)
            setIsAllTermsFlow(false)
            if (isAllTermsFlow) setAgreedTerms(terms.map(term => term.id))
        }
    }

    const handleCloseTermModal = () => {
        if (currentTermIndex !== null) {
            const current = terms[currentTermIndex]
            if (!viewedTerms.includes(current.id)) setViewedTerms(prev => [...prev, current.id])
        }
        setCurrentTermIndex(null)
        setIsAllTermsFlow(false)
    }

    return (
        <motion.div className="min-h-screen flex flex-col bg-[#F8F9FA] " initial="initial" animate="animate" exit="exit"
                    variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }} transition={{ duration: 0.3 }}>
            <header className="p-4 flex items-center border-b border-gray-100 ">
                <Button variant="ghost" size="icon" className="mr-2 text-gray-500 " onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <motion.h1 className="text-xl font-bold text-gray-800 "
                           initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    {title}
                </motion.h1>
            </header>

            <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                <div className="w-full max-w-md">
                    <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <h2 className="text-lg font-semibold text-gray-800  mb-2">{title}</h2>
                        <p className="text-gray-600  text-sm">{description}</p>
                    </motion.div>

                    <AnimatePresence>
                        {showAlert && (
                            <motion.div key="terms-alert" className="mb-4 p-4 bg-red-50  rounded-xl flex items-center text-red-500  shadow-sm"
                                        initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }}
                                        exit={{ opacity: 0, y: -10, height: 0 }} transition={{ duration: 0.2 }}>
                                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                                <p className="text-sm">모든 필수 약관에 동의해야 진행할 수 있습니다.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <TermsCardList
                        terms={terms}
                        agreedTerms={agreedTerms}
                        viewedTerms={viewedTerms}
                        allAgreed={allAgreed}
                        onToggleAll={handleToggleAll}
                        onToggleTerm={handleToggleTerm}
                        onViewTerm={handleViewTerm}
                    />

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="relative mt-6">
                        <Button
                            className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                            onClick={handleSubmit}
                            disabled={!terms.filter(term => term.required).every(term => agreedTerms.includes(term.id))}
                        >
                            다음
                        </Button>
                    </motion.div>
                </div>
            </div>

            {currentTermIndex !== null && (
                <TermsModal
                    term={terms[currentTermIndex]}
                    onAgree={handleAgreeCurrentTerm}
                    onClose={handleCloseTermModal}
                />
            )}
        </motion.div>
    )
}

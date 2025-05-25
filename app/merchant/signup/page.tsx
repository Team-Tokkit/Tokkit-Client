"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { merchantTerms } from "./data/merchant-terms"
import MerchantTermsHeader from "./components/MerchantTermsHeader"
import TermsAlert from "./components/TermsAlert"
import TermsAgreementCard from "./components/TermsAgreementCard"
import TermsModal from "./components/TermsModal"

export interface Term {
    id: string
    title: string
    required: boolean
    content?: string
}

export default function MerchantSignupPage() {
    const router = useRouter()
    const [terms] = useState<Term[]>(merchantTerms)
    const [agreedTerms, setAgreedTerms] = useState<string[]>([])
    const [allAgreed, setAllAgreed] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [currentTermIndex, setCurrentTermIndex] = useState<number | null>(null)
    const [viewedTerms, setViewedTerms] = useState<string[]>([])
    const [isAllTermsFlow, setIsAllTermsFlow] = useState(false)
    const termRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const initialRenderRef = useRef(true)

    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false
            return
        }
        const isAllAgreed = terms.every((term) => agreedTerms.includes(term.id))
        setAllAgreed(isAllAgreed)
    }, [agreedTerms, terms])

    const handleToggleTerm = (termId: string) => {
        if (!viewedTerms.includes(termId)) {
            const termIndex = terms.findIndex((term) => term.id === termId)
            if (termIndex !== -1) {
                setCurrentTermIndex(termIndex)
                setIsAllTermsFlow(false)
            }
            return
        }
        setAgreedTerms((prev) =>
            prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId]
        )
    }

    const handleToggleAll = () => {
        if (allAgreed) {
            setAgreedTerms([])
        } else {
            const allViewed = terms.every((term) => viewedTerms.includes(term.id))
            if (allViewed) {
                setAgreedTerms(terms.map((term) => term.id))
            } else {
                setIsAllTermsFlow(true)
                const firstNotViewed = terms.findIndex((term) => !viewedTerms.includes(term.id))
                setCurrentTermIndex(firstNotViewed !== -1 ? firstNotViewed : 0)
            }
        }
    }

    const handleViewTerm = (termId: string) => {
        const termIndex = terms.findIndex((term) => term.id === termId)
        if (termIndex !== -1) {
            setCurrentTermIndex(termIndex)
            setIsAllTermsFlow(false)
        }
    }

    const handleAgreeCurrentTerm = () => {
        if (currentTermIndex !== null) {
            const currentTerm = terms[currentTermIndex]
            if (!viewedTerms.includes(currentTerm.id)) setViewedTerms((prev) => [...prev, currentTerm.id])
            if (!agreedTerms.includes(currentTerm.id)) setAgreedTerms((prev) => [...prev, currentTerm.id])
            if (isAllTermsFlow && currentTermIndex < terms.length - 1) {
                setCurrentTermIndex(currentTermIndex + 1)
            } else {
                setCurrentTermIndex(null)
                setIsAllTermsFlow(false)
                if (isAllTermsFlow) setAgreedTerms(terms.map((term) => term.id))
            }
        }
    }

    const handleCloseTermModal = () => {
        if (currentTermIndex !== null) {
            const currentTerm = terms[currentTermIndex]
            if (!viewedTerms.includes(currentTerm.id)) setViewedTerms((prev) => [...prev, currentTerm.id])
        }
        setCurrentTermIndex(null)
        setIsAllTermsFlow(false)
    }

    const handleSubmit = () => {
        const requiredTerms = terms.filter((term) => term.required).map((term) => term.id)
        const allRequiredAgreed = requiredTerms.every((termId) => agreedTerms.includes(termId))
        if (allRequiredAgreed) {
            router.push("/merchant/signup/business")
        } else {
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000)
        }
    }

    return (
        <motion.div
            className="h-screen flex flex-col bg-white dark:bg-gray-900"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }}
            transition={{ duration: 0.3 }}
        >
            <MerchantTermsHeader />
            <div className="items-center  justify-center flex-1 flex flex-col items-center p-6">
                <div className="w-full max-w-md">
                    <TermsAlert show={showAlert} />
                    <TermsAgreementCard
                        terms={terms}
                        agreedTerms={agreedTerms}
                        viewedTerms={viewedTerms}
                        allAgreed={allAgreed}
                        termRefs={termRefs}
                        onToggleAll={handleToggleAll}
                        onToggleTerm={handleToggleTerm}
                        onViewTerm={handleViewTerm}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
            <TermsModal
                term={currentTermIndex !== null ? terms[currentTermIndex] : null}
                isVisible={currentTermIndex !== null}
                onClose={handleCloseTermModal}
                onAgree={handleAgreeCurrentTerm}
            />
        </motion.div>
    )
}

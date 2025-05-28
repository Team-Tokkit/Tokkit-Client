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
                className="h-screen flex flex-col bg-[#F8F9FA]"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }}
                transition={{ duration: 0.3 }}
            >
                {/* 상단 고정 헤더 */}
                <MerchantTermsHeader />

                {/* 헤더 제외 전체 중앙 정렬 영역 */}
                <div className="flex flex-1 flex-col items-center justify-center px-6">
                    <div className="w-full max-w-md">
                        {/* 제목 및 설명 */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">가맹점 약관 동의</h2>
                            <p className="text-sm text-gray-600 mt-2">안전한 가맹점 서비스 이용을 위해 아래 약관에 동의해주세요.</p>
                        </div>

                        {/* 경고 및 약관 카드 */}
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

                {/* 모달 */}
                <TermsModal
                    term={currentTermIndex !== null ? terms[currentTermIndex] : null}
                    isVisible={currentTermIndex !== null}
                    onClose={handleCloseTermModal}
                    onAgree={handleAgreeCurrentTerm}
                />
            </motion.div>
        )
    }

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Eye, Check } from "lucide-react"
import { Term } from "../data/merchant-terms"

interface Props {
    terms: Term[]
    agreedTerms: string[]
    viewedTerms: string[]
    allAgreed: boolean
    termRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>
    onToggleAll: () => void
    onToggleTerm: (termId: string) => void
    onViewTerm: (termId: string) => void
    onSubmit: () => void
}

export default function TermsAgreementCard({
                                               terms,
                                               agreedTerms,
                                               viewedTerms,
                                               allAgreed,
                                               termRefs,
                                               onToggleAll,
                                               onToggleTerm,
                                               onViewTerm,
                                               onSubmit,
                                           }: Props) {
    const checkboxVariants = {
        checked: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
        unchecked: { scale: 1 },
    }

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            {/* 전체 동의 */}
            <div className="flex items-center border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
                <motion.div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 cursor-pointer transition-colors duration-200 ${
                        allAgreed ? "bg-[#FFB020] dark:bg-[#FFD485]" : "border-2 border-[#FFB020]/50 dark:border-[#FFD485]/50"
                    }`}
                    onClick={onToggleAll}
                    variants={checkboxVariants}
                    animate={allAgreed ? "checked" : "unchecked"}
                >
                    {allAgreed && <Check className="h-4 w-4 text-white dark:text-gray-900" />}
                </motion.div>
                <span className="font-semibold text-gray-800 dark:text-gray-100 cursor-pointer" onClick={onToggleAll}>
          모든 약관에 동의합니다
        </span>
            </div>

            {/* 개별 약관 목록 */}
            {terms.map((term, index) => (
                <motion.div
                    key={term.id}
                    ref={(el) => { termRefs.current[term.id] = el }}
                    className={`flex items-center justify-between py-4 ${
                        index < terms.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                >
                    <div className="flex items-center">
                        <motion.div
                            className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 cursor-pointer transition-colors duration-200 ${
                                agreedTerms.includes(term.id)
                                    ? "bg-[#FFB020] dark:bg-[#FFD485]"
                                    : "border-2 border-[#FFB020]/40 dark:border-[#FFD485]/40"
                            } ${!viewedTerms.includes(term.id) ? "opacity-50" : ""}`}
                            onClick={() => onToggleTerm(term.id)}
                            variants={checkboxVariants}
                            animate={agreedTerms.includes(term.id) ? "checked" : "unchecked"}
                        >
                            {agreedTerms.includes(term.id) && <Check className="h-3 w-3 text-white dark:text-gray-900" />}
                        </motion.div>
                        <div>
                            <label
                                htmlFor={`term-${term.id}`}
                                className="text-sm font-medium text-gray-800 dark:text-gray-100 cursor-pointer"
                            >
                                {term.title}
                            </label>
                            {term.required ? (
                                <span className="text-red-500 ml-1 text-xs">(필수)</span>
                            ) : (
                                <span className="text-gray-400 ml-1 text-xs">(선택)</span>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#FFB020] hover:text-[#FF9500] dark:text-[#FFD485] dark:hover:text-[#FFCA5A] hover:bg-[#FFF8E8] dark:hover:bg-[#433619] p-2 h-8 rounded-lg transition-all duration-200"
                        onClick={() => onViewTerm(term.id)}
                    >
                        보기 <Eye className="h-4 w-4 ml-1" />
                    </Button>
                </motion.div>
            ))}

            {/* 다음 버튼 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative mt-6"
            >
                <Button
                    className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-gray-900 font-medium rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    onClick={onSubmit}
                    disabled={!terms.filter((t) => t.required).every((t) => agreedTerms.includes(t.id))}
                >
                    다음
                </Button>
            </motion.div>
        </motion.div>
    )
}

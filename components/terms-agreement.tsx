"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Term {
  id: string
  title: string
  required: boolean
  content: string
}

interface TermsAgreementProps {
  terms: Term[]
  onAgree: (agreedTerms: string[]) => void
}

export default function TermsAgreement({ terms, onAgree }: TermsAgreementProps) {
  const [expandedTerms, setExpandedTerms] = useState<string[]>([])
  const [agreedTerms, setAgreedTerms] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedTerms((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleAgree = (id: string) => {
    setAgreedTerms((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    if (agreedTerms.length === terms.length) {
      setAgreedTerms([])
    } else {
      setAgreedTerms(terms.map((term) => term.id))
    }
  }

  const isAllAgreed = agreedTerms.length === terms.length
  const canProceed = terms.filter((term) => term.required).every((term) => agreedTerms.includes(term.id))

  return (
    <div className="space-y-6">
      {/* 전체 동의 */}
      <div
        className="flex items-center p-4 bg-[#F5F5F5] dark:bg-[#2A2A2A] rounded-xl cursor-pointer"
        onClick={toggleAll}
      >
        <div className="flex items-center flex-1">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
              isAllAgreed ? "bg-[#FFB020] dark:bg-[#FFD485]" : "border border-[#CCCCCC] dark:border-[#444444]"
            }`}
          >
            {isAllAgreed && <Check className="h-4 w-4 text-white dark:text-[#1A1A1A]" />}
          </div>
          <span className="font-medium text-[#1A1A1A] dark:text-white">전체 동의</span>
        </div>
      </div>

      {/* 개별 약관 */}
      {terms.map((term) => (
        <div key={term.id} className="border border-[#E0E0E0] dark:border-[#333333] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleAgree(term.id)}>
            <div className="flex items-center flex-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                  agreedTerms.includes(term.id)
                    ? "bg-[#FFB020] dark:bg-[#FFD485]"
                    : "border border-[#CCCCCC] dark:border-[#444444]"
                }`}
              >
                {agreedTerms.includes(term.id) && <Check className="h-3 w-3 text-white dark:text-[#1A1A1A]" />}
              </div>
              <span className="text-sm text-[#1A1A1A] dark:text-white">
                {term.title} {term.required && <span className="text-red-500">*</span>}
              </span>
            </div>
            <button
              className="text-[#666666] dark:text-[#BBBBBB]"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpand(term.id)
              }}
            >
              {expandedTerms.includes(term.id) ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>

          {expandedTerms.includes(term.id) && (
            <div className="p-4 bg-[#F5F5F5] dark:bg-[#222222] border-t border-[#E0E0E0] dark:border-[#333333]">
              <p className="text-xs text-[#666666] dark:text-[#BBBBBB] whitespace-pre-line h-32 overflow-y-auto">
                {term.content}
              </p>
            </div>
          )}
        </div>
      ))}

      <Button
        onClick={() => onAgree(agreedTerms)}
        disabled={!canProceed}
        className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A] font-medium rounded-xl shadow-md shadow-[#FFB020]/20 dark:shadow-[#FFD485]/10 mt-4"
      >
        다음
      </Button>
    </div>
  )
}

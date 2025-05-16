"use client"

import { ReactNode, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableSectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

export function ExpandableSection({ title, icon, children }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(true) // 초기값을 true로 설정

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full p-4"
      >
        <div className="flex items-center">
          {icon}
          <h3 className="font-medium text-base text-[#1A1A1A] ml-2">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#666]" /> : <ChevronDown className="w-5 h-5 text-[#666]" />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 text-sm text-[#666666]">
          {children}
        </div>
      )}
    </div>
  )
}
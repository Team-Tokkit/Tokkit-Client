"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  { id: "all", name: "전체" },
  { id: "FOOD", name: "음식" },
  { id: "MEDICAL", name: "의료" },
  { id: "SERVICE", name: "서비스" },
  { id: "TOURISM", name: "관광" },
  { id: "LODGING", name: "숙박" },
  { id: "EDUCATION", name: "교육" },
]

export default function VoucherCategoryWithFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const storeCategory = searchParams.get("storeCategory") || "all"
  const sortBy = searchParams.get("sortBy") || ""
  const [open, setOpen] = useState(false)

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === "all") {
      params.delete("storeCategory")
    } else {
      params.set("storeCategory", value)
    }
    router.push(`/vouchers?${params.toString()}`)
  }

  const handleFilterClick = (sort: string) => {
    const params = new URLSearchParams(searchParams)
    if (sortBy === sort) {
      params.delete("sortBy")
    } else {
      params.set("sortBy", sort)
    }
    router.push(`/vouchers?${params.toString()}`)
  }

  return (
    <div className="flex flex-col items-center justify-between w-full">
      {/* 카테고리 탭과 필터 버튼 */}
      <div className="flex items-center justify-between w-full">
        <Tabs value={storeCategory} onValueChange={handleCategoryChange}>
          <TabsList className="bg-gray-100 rounded-lg px-2 gap-2 overflow-x-auto">
            {categories.map((storeCategory) => (
              <TabsTrigger
                key={storeCategory.id}
                value={storeCategory.id}
                className="whitespace-nowrap text-sm font-medium px-1 py-1 text-center min-w-[45px] rounded-md hover:bg-gray-200 transition-colors"
              >
                {storeCategory.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => setOpen(!open)}
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      {/* 필터 박스 (애니메이션 개선) */}
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
        className={`w-full max-w-[600px] mx-auto bg-white rounded-lg shadow-lg mt-2 border border-gray-200 ${open ? "p-3" : "p-0"} overflow-hidden`}
      >
        {open && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "newest", label: "최신순" },
              { id: "amountHigh", label: "금액 높은 순" },
              { id: "amountLow", label: "금액 낮은 순" },
            ].map((option) => (
              <Button
                key={option.id}
                variant="outline"
                size="sm"
                className={`justify-center text-sm font-medium py-2 rounded-md ${sortBy === option.id ? "bg-[#FFB020]/10 border-[#FFB020]" : ""
                  }`}
                onClick={() => handleFilterClick(option.id)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        )}
      </motion.div>


    </div>
  )
}

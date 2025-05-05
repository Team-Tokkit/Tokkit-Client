"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  { id: "all", name: "전체" },
  { id: "job", name: "취업" },
  { id: "culture", name: "문화" },
  { id: "health", name: "의료" },
  { id: "education", name: "교육" },
  { id: "digital", name: "디지털" },
  { id: "care", name: "돌봄" },
]

export default function VoucherCategoryWithFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "all"
  const sortBy = searchParams.get("sortBy") || ""
  const [open, setOpen] = useState(false)

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === "all") {
      params.delete("category")
    } else {
      params.set("category", value)
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
    <div className="items-center justify-between">
      <div className="flex items-center justify-between">
        <Tabs value={category} onValueChange={handleCategoryChange}>
          <TabsList
            className="bg-gray-100 rounded-lg px-2 gap-2"
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              width: "100%", // 부모 컨테이너에 맞춤
              maxWidth: "100%", // 부모를 넘지 않도록 제한
            }}
          >
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="whitespace-nowrap text-sm font-medium px-1 py-1 text-center min-w-[45px] rounded-md hover:bg-gray-200 transition-colors" // 폰트 크기와 스타일 조정
              >
                {category.name}
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 z-10 p-4 bg-white rounded-lg shadow-lg max-w-[440px] mx-auto"
          >
            <h3 className="font-medium mb-2">추가 필터</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                // TODO: id 수정
                { id: "amountHigh", label: "금액 높은 순" },
                { id: "amountLow", label: "금액 낮은 순" },
                { id: "deadlineClose", label: "마감 임박순" },
                { id: "newest", label: "최신순" },
              ].map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  size="sm"
                  className={`justify-start ${sortBy === option.id ? "bg-[#FFB020]/10" : ""}`}
                  onClick={() => handleFilterClick(option.id)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
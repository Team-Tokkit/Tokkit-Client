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

const sortOptions = [
  { id: "createdAt", label: "최신순", direction: "desc" },
  { id: "price", label: "금액 높은 순", direction: "desc" },
  { id: "price", label: "금액 낮은 순", direction: "asc" },
]

export default function VoucherCategoryWithFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const storeCategory = searchParams.get("storeCategory") || "all"
  const sort = searchParams.get("sort") || "createdAt"
  const direction = searchParams.get("direction") || "desc"
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

  const handleSortChange = (sort: string, direction: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("sort", sort)
    params.set("direction", direction)
    router.push(`/vouchers?${params.toString()}`)
  }

  return (
    <div className="flex flex-col items-center justify-between w-full">
      <div className="flex items-center justify-between w-full">
        <Tabs value={storeCategory} onValueChange={handleCategoryChange}>
          <TabsList className="bg-gray-100 rounded-lg px-2 gap-2 overflow-x-auto">
            {categories.map((c) => (
              <TabsTrigger
                key={c.id}
                value={c.id}
                className="whitespace-nowrap text-sm font-medium px-1 py-1 min-w-[45px] rounded-md hover:bg-gray-200"
              >
                {c.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Button variant="ghost" size="icon" className="ml-2" onClick={() => setOpen(!open)}>
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.9 }}
        className={`w-full max-w-[600px] mx-auto bg-white rounded-lg shadow-lg mt-2 border border-gray-200 ${open ? "p-3" : "p-0"} overflow-hidden`}
      >
        {open && (
          <div className="grid grid-cols-3 gap-3">
            {sortOptions.map((option) => (
              <Button
                key={option.label}
                variant="outline"
                size="sm"
                className={`justify-center text-sm font-medium py-2 rounded-md ${
                  sort === option.id && direction === option.direction
                    ? "bg-[#FFB020]/10 border-[#FFB020]"
                    : ""
                }`}
                onClick={() => handleSortChange(option.id, option.direction)}
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

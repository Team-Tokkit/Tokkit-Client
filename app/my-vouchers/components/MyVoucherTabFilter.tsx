'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"

export default function MyVoucherTabFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sort = searchParams.get("sort") || "recent"
  const userId = searchParams.get("userId")
  const query = searchParams.get("q")

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("sort", value) 
    if (userId) params.set("userId", userId)
    if (query) params.set("searchKeyword", query)
    router.push(`/my-vouchers?${params.toString()}`)
  }

  return (
    <Tabs value={sort} onValueChange={handleSortChange}>
      <TabsList className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-2">
        <TabsTrigger value="recent" className="flex-1 text-sm font-medium py-1 rounded-md">최신순</TabsTrigger>
        <TabsTrigger value="amount" className="flex-1 text-sm font-medium py-1 rounded-md">금액순</TabsTrigger>
        <TabsTrigger value="expiry" className="flex-1 text-sm font-medium py-1 rounded-md">만료순</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

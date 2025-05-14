"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function VoucherSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get("searchKeyword") || ""

  const [keyword, setKeyword] = useState(initialValue)
  const [debounced, setDebounced] = useState(initialValue)

  // 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(keyword)
    }, 1000)
    return () => clearTimeout(timer)
  }, [keyword])

  // 디바운싱된 값 URL 반영
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debounced) {
      params.set("searchKeyword", debounced)
    } else {
      params.delete("searchKeyword")
    }
    router.push(`/my-vouchers?${params.toString()}`)
  }, [debounced])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="바우처 검색"
        className="pl-10 pr-4 py-2 rounded-lg"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  )
}

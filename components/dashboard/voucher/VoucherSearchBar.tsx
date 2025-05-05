// app/vouchers/components/VoucherSearchBar.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function VoucherSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    if (e.target.value) {
      params.set("q", e.target.value)
    } else {
      params.delete("q")
    }
    router.push(`/vouchers?${params.toString()}`)
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="바우처 검색"
        className="pl-10 pr-4 py-2 rounded-lg"
        defaultValue={query}
        onChange={handleSearch}
      />
    </div>
  )
}

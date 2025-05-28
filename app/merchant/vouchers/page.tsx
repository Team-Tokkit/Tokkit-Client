// app/merchant/vouchers/page.tsx
'use client'

import { Suspense,useState } from "react"
import VouchersHeader from "@/app/merchant/vouchers/components/Header"
import VoucherSearchBar from "@/app/merchant/vouchers/components/SearchBar"
import VoucherList from "@/app/merchant/vouchers/components/VoucherList"

export default function MerchantVouchersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="h-screen bg-[#F8F9FA] pb-20">
      <VouchersHeader />
      <VoucherSearchBar value={searchQuery} onChange={setSearchQuery} />
      <Suspense fallback={<div>바우처 목록 불러오는 중...</div>}>
        <VoucherList keyword={searchQuery} />
      </Suspense>
    </div>
  )
}

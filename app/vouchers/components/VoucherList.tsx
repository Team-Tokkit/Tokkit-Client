"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import VoucherCard from "./VoucherCard"
import { getVouchers } from "@/lib/api/voucher"
import type { Voucher } from "@/app/vouchers/types/voucher"
import Pagination from "@/components/notice/Pagination"

export default function VoucherList() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1) // 1-based index
  const [totalPages, setTotalPages] = useState(1)
  const searchParams = useSearchParams()

useEffect(() => {
  const storeCategory = searchParams.get("storeCategory")
  const sort = searchParams.get("sort") || "createdAt"
  const direction = searchParams.get("direction") || "desc"
  const searchKeyword = searchParams.get("searchKeyword") || ""

  const params: Record<string, string | number> = {
    sort,
    direction,
    page: page - 1,
    size: 15,
  }

  if (storeCategory && storeCategory !== "all") {
    params.storeCategory = storeCategory.toUpperCase()
  }

  if (searchKeyword) {
    params.searchKeyword = searchKeyword
  }

  setLoading(true)
  getVouchers(params)
    .then((res) => {
      setVouchers(res.content)
      setTotalPages(res.totalPages)
    })
    .catch(() => {
      setVouchers([])
      setTotalPages(1)
    })
    .finally(() => setLoading(false))
}, [searchParams.toString(), page])



  if (loading) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-[#FAFAFA]">
        <img
          src="/images/loading-bunny.png"
          alt="로딩 중"
          className="w-32 h-28 md:w-48 md:h-40 mb-6 object-contain"
        />
        <p className="text-[#666666] text-lg font-medium">바우처를 불러오는 중입니다...</p>
      </div>
    )
  }

  if (vouchers.length === 0) {
    return <p className="text-center mt-10 text-gray-500">검색 결과가 없습니다.</p>
  }

  return (
    <div>
      <div className="space-y-4">
        {vouchers.map((voucher) => (
          <VoucherCard key={voucher.id} voucher={voucher} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  )
}

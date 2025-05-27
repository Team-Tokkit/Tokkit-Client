"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import VoucherCard from "./VoucherCard"
import { getVouchers } from "@/lib/api/voucher"
import type { Voucher } from "@/app/vouchers/types/voucher"
import Pagination from "@/components/common/Pagination"
export default function VoucherList() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
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
      size: 10,
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
        console.log("API Response:", res);
        setVouchers(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching vouchers:", error);
        setVouchers([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [searchParams.toString(), page])



  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
          >
            <div className="h-40 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="flex justify-between items-center mt-4">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (vouchers.length === 0) {
    return <p className="text-center mt-10 text-gray-500">검색 결과가 없습니다.</p>
  }

  return (
    <div>
      <div className="space-y-4 mb-5">
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

'use client'

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import VoucherHeader from "@/app/vouchers/components/VoucherHeader"
import MyVoucherList from "@/app/my-vouchers/components/MyVoucherList"
import MyVoucherTabFilter from "@/app/my-vouchers/components/MyVoucherTabFilter"
import MyVoucherSearchBar from "@/app/my-vouchers/components/MyVoucherSearchBar"
import { filterMyVouchers } from "@/lib/api/voucher"
import type { MyVoucher } from "@/app/my-vouchers/types/my-voucher"

export default function MyVouchersPage() {
  const [myVouchers, setMyVouchers] = useState<MyVoucher[]>([])
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const userId = parseInt(searchParams.get("userId") || "0", 10)
  const keyword = searchParams.get("searchKeyword") || ""
  const sort = searchParams.get("sort") || "recent"

  useEffect(() => {
    const fetchFilteredVouchers = async () => {
      try {
        if (!userId) return
        const filters = {
          userId,
          searchKeyword: keyword,
          sort,
        }

        const res = await filterMyVouchers(filters, 0, 15)
        setMyVouchers(res.content)
      } catch (error) {
        console.error("내 바우처 필터링 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredVouchers()
  }, [userId, keyword, sort])

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <VoucherHeader title="내 바우처" />

      <div className="p-4 bg-white shadow-sm">
        <MyVoucherSearchBar />
        <div className="mt-4">
          <MyVoucherTabFilter />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">
          내 바우처 ({myVouchers.length})
        </h2>
        <MyVoucherList myVouchers={myVouchers} loading={loading} />
      </div>
    </div>
  )
}

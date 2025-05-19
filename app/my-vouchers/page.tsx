'use client'

import { useEffect, useState } from "react"
import { useSearchParams }   from "next/navigation"
import VoucherHeader         from "@/app/vouchers/components/VoucherHeader"
import MyVoucherList        from "@/app/my-vouchers/components/MyVoucherList"
import MyVoucherTabFilter   from "@/app/my-vouchers/components/MyVoucherTabFilter"
import MyVoucherSearchBar   from "@/app/my-vouchers/components/MyVoucherSearchBar"
import { getMyVouchers }    from "@/lib/api/voucher"
import type { MyVoucher }   from "@/app/my-vouchers/types/my-voucher"

export default function MyVouchersPage() {
  const [myVouchers, setMyVouchers] = useState<MyVoucher[]>([])
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const keyword = searchParams.get("searchKeyword") || ""
  const sort    = searchParams.get("sort")         || "recent"

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await getMyVouchers({
          searchKeyword: keyword,
          sort,
          page: 0,
          size: 15,
        })
        console.log("🎯 fetchMyVouchers 응답:", res)
        setMyVouchers(res.content)
      } catch (e) {
        console.error("내 바우처 조회 실패:", e)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [keyword, sort])

  const handleDelete = (id: number) =>
    setMyVouchers((prev) => prev.filter((v) => v.id !== id))

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
        <MyVoucherList
          vouchers={myVouchers}
          loading={loading}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

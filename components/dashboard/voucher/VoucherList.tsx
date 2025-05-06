"use client"

import { useEffect, useState } from "react"
import VoucherCard from "./VoucherCard"
import { getVouchers } from "@/lib/api/voucher"
import type { Voucher } from "@/types/voucher"
import { mockVouchers } from "@/mock/voucher"

export default function VoucherList() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVouchers()
      .then(setVouchers)
      .catch(() => setVouchers([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setVouchers(mockVouchers)
      setLoading(false)
    }, 500) // 로딩 테스트용
  }, [])
  
  if (loading) return <p>로딩 중...</p>
  if (vouchers.length === 0) return <p>"검색 결과가 없습니다."</p>

  return (
    <div className="space-y-4">
      {vouchers.map((voucher) => (
        <VoucherCard key={voucher.id} voucher={voucher} />
      ))}
    </div>
  )
}

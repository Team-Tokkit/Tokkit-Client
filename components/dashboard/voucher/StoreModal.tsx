"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface StoreModalProps {
  voucherId: number
  onClose: () => void
}

export function StoreModal({ voucherId, onClose }: StoreModalProps) {
  const [stores, setStores] = useState<string[]>([])

  useEffect(() => {
    async function fetchAllStores() {
      // 실제 API 연동 시
      // const res = await fetch(`/api/vouchers/${voucherId}/stores`)
      // const data = await res.json()
      // setStores(data.stores)

      // 지금은 mock
      setStores([
        "가게 A", "가게 B", "가게 C", "가게 D", "가게 E",
        "가게 F", "가게 G", "가게 H", "가게 I", "가게 J"
      ])
    }

    fetchAllStores()
  }, [voucherId])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-auto p-6 relative">
        <button
          className="absolute top-3 right-3 text-[#666666] hover:text-black"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold mb-4">전체 사용처</h2>
        <ul className="list-disc pl-5 text-sm text-[#666666] space-y-1">
          {stores.map((store, idx) => (
            <li key={idx}>{store}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

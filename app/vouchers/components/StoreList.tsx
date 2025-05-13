"use client"

import { useEffect, useState } from "react"
import { StoreModal } from "./StoreModal"
import { getVoucherStores } from "@/lib/api/voucher"

interface StoreListProps {
  voucherId: number
}

export function StoreList({ voucherId }: StoreListProps) {
  const [previewStores, setPreviewStores] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchPreviewStores() {
      try {
        const res = await getVoucherStores(voucherId, 0, 5) // 5개만 미리 보기로 가져오기
        console.log("🔍 받은 사용처 목록:", res.content)

        const names = res.content.map((store: any) => {
          console.log("👉 store 객체:", store)
          return store.storeName
        })

        setPreviewStores(names)
      } catch (error) {
        console.error("사용처 불러오기 실패:", error)
        setPreviewStores([])
      }
    }

    fetchPreviewStores()
  }, [voucherId])

  return (
    <div>
      <ul className="list-disc pl-5 text-sm text-[#666666] space-y-1 mb-2">
        {previewStores.map((storeName, idx) => (
          <li key={idx}>{storeName || "(이름 없음)"}</li>
        ))}
      </ul>

      {previewStores.length > 0 && (
        <div className="flex justify-center my-2">
          <button
            className="text-sm text-[#FFB020] underline hover:text-[#FF9500] transition"
            onClick={() => setIsModalOpen(true)}
          >
            전체 보기
          </button>
        </div>
      )}

      {isModalOpen && (
        <StoreModal voucherId={voucherId} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { MyStoreModal } from "./MyStoreModal"
import { getMyVoucherStores } from "@/lib/api/voucher"

interface MyStoreListProps {
  voucherOwnershipId: number
}

export function MyStoreList({ voucherOwnershipId }: MyStoreListProps) {
  const [previewStores, setPreviewStores] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchPreviewStores() {
      console.log("voucherOwnershipId:", voucherOwnershipId) 

      try {
        const res = await getMyVoucherStores(voucherOwnershipId, 0, 5)
        const names = res.content.map((store: any) => store.storeName)
        setPreviewStores(names)
      } catch (error: any) {
        console.error("사용처 불러오기 실패:", error.response?.data || error.message)
        setPreviewStores([])
      }
    }

    fetchPreviewStores()
  }, [voucherOwnershipId])

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
        <MyStoreModal
          voucherOwnershipId={voucherOwnershipId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { StoreModal } from "./StoreModal"

interface StoreListProps {
  voucherId: number
}

export function StoreList({ voucherId }: StoreListProps) {
  const [previewStores, setPreviewStores] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchPreviewStores() {
      // API 연동 코드 구현

      // mock
      setPreviewStores(["가게 A", "가게 B", "가게 C", "가게 D", "가게 E"])
    }

    fetchPreviewStores()
  }, [voucherId])

  return (
    <div>
      <ul className="list-disc pl-5 text-sm text-[#666666] space-y-1 mb-2">
        {previewStores.map((store, idx) => (
          <li key={idx}>{store}</li>
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

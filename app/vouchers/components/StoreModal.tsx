"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { getVoucherStores } from "@/lib/api/voucher"
import Pagination from "@/components/dashboard/notices/Pagination"

interface StoreModalProps {
  voucherId: number
  onClose: () => void
}

export function StoreModal({ voucherId, onClose }: StoreModalProps) {
  const [stores, setStores] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 10

  useEffect(() => {
    async function fetchStores() {
      try {
        const res = await getVoucherStores(voucherId, page, pageSize)
        const names = res.content.map((store: any) => store.storeName)
        setStores(names)
        setTotalPages(res.totalPages)
      } catch (error) {
        console.error("전체 사용처 불러오기 실패:", error)
        setStores([])
      }
    }

    fetchStores()
  }, [voucherId, page])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-lg relative">
        {/* 상단 닫기 버튼 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">전체 사용처</h2>
          <button
            className="text-[#666666] hover:text-black"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 리스트 */}
        {/* 리스트 부분 */}
        <div className="p-4">
          {stores.length > 0 ? (
            <ul className="space-y-3">
              {stores.map((store, idx) => (
                <li
                  key={idx}
                  className="py-2 px-3 rounded-md border text-sm text-[#333] bg-[#FAFAFA]"
                >
                  {store}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">사용처 정보가 없습니다.</p>
          )}
        </div>


        {/* 페이지네이션 */}
        {totalPages > 1 && stores.length > 0 && (
          <div className="border-t p-4 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage: number) => {
                if (newPage !== page) {
                  setPage(newPage)
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

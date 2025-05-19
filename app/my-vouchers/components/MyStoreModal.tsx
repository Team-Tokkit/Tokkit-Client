"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { getMyVoucherStores } from "@/lib/api/voucher"
import Pagination from "@/app/vouchers/components/Pagination"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface MyStoreModalProps {
  voucherOwnershipId: number
  onClose: () => void
}

export function MyStoreModal({ voucherOwnershipId, onClose }: MyStoreModalProps) {
  const [stores, setStores] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const pageSize = 10

  const resetData = () => {
    setStores([])
    setPage(0)
    setTotalPages(0)
    setTotalCount(0)
    setIsLoading(true)
  }

  useEffect(() => {
    resetData()
  }, [voucherOwnershipId])

  useEffect(() => {
    let isAborted = false

    async function fetchStores() {
      setIsLoading(true)
      try {
        const res = await getMyVoucherStores(voucherOwnershipId, page, pageSize)
        const names = res.content.map((store: any) => store.storeName)

        if (!isAborted) {
          const newTotalPages = Math.max(1, Math.ceil(res.totalElements / pageSize))
          setTotalPages(newTotalPages)
          setTotalCount(res.totalElements)

          if (page >= newTotalPages && newTotalPages > 0) {
            setPage(0)
          } else {
            setStores(names)
          }
        }
      } catch (error) {
        if (!isAborted) {
          console.error("전체 사용처 불러오기 실패:", error)
          setStores([])
          setTotalPages(0)
          setTotalCount(0)
        }
      } finally {
        if (!isAborted) setIsLoading(false)
      }
    }

    fetchStores()

    return () => {
      isAborted = true
    }
  }, [voucherOwnershipId, page])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-xl relative"
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 10, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 350,
            mass: 0.8,
            duration: 0.3,
          }}
        >
          {/* 헤더 */}
          <div className="flex justify-between items-center p-5 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-800">전체 사용처</h2>
              <Badge variant="outline" className="bg-gray-100">
                {totalCount}개
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
              onClick={onClose}
            >
              <X className="w-5 h-5 text-gray-500" />
              <span className="sr-only">닫기</span>
            </Button>
          </div>

          {/* 리스트 */}
          <ScrollArea className="h-[50vh]">
            <div className="p-5">
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="h-12 bg-gray-100 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : stores.length > 0 ? (
                <ul className="space-y-2">
                  {stores.map((store, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: idx * 0.03,
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      className="py-3 px-4 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition-all duration-200 rounded-lg flex items-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mr-3" />
                      {store}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">사용처 정보가 없습니다.</p>
                  <p className="text-gray-400 text-sm mt-1">등록된 사용처가 없거나 정보를 불러오는데 실패했습니다.</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <>
              <Separator />
              <div className="p-4 flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(newPage: number) => {
                    if (newPage !== page && newPage >= 0 && newPage < totalPages) {
                      setPage(newPage)
                    }
                  }}
                />
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

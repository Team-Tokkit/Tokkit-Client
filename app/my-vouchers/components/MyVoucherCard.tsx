"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MoreVertical, CheckCircle, Trash2, AlertTriangle, X } from "lucide-react"
import { useState } from "react"
import type { MyVoucher } from "@/app/my-vouchers/types/my-voucher"
import StatusBadge from "@/app/my-vouchers/components/StatusBadge"
import { deleteMyVoucher } from "@/lib/api/voucher"
import { getImageSrc } from "@/lib/api/getImageSrc"

interface Props {
  voucher: MyVoucher
  onDelete: (voucherId: number) => void
}

export default function MyVoucherCard({ voucher, onDelete }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const isDisabled = ["USED", "EXPIRED", "CANCELLED"].includes(voucher.status)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteMyVoucher(voucher.id)
      console.log(`Voucher ${voucher.id} 삭제 성공`)
      setIsDeleted(true)
      setTimeout(() => {
        setIsDeleted(false)
        setIsConfirmModalOpen(false)
        setIsModalOpen(false)
        onDelete(voucher.id)
      }, 2000)
    } catch (error) {
      console.error(`Voucher ${voucher.id} 삭제 실패:`, error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Link
        href={`/my-vouchers/details/${voucher.id}`}
        className="block bg-white  rounded-xl shadow-sm overflow-hidden hover:-translate-y-0.5 transition-transform"
      >
        <div className="relative h-40">
          {/* 이미지 */}
          <Image src={getImageSrc(voucher.imageUrl || "/placeholder.svg")} alt={voucher.imageUrl} fill className="object-cover" unoptimized/>

          {/* 블러 처리 */}
          {isDisabled && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-20" />
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <StatusBadge status={voucher.status} />
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsModalOpen(true)
              }}
              className="p-1 rounded-full hover:bg-gray-200 "
            >
              <MoreVertical className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 p-4 z-30">
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80 text-[#1A1A1A] shadow-sm mb-2">
              {voucher.contact}
            </span>
            <h3 className="text-xl font-bold text-white">{voucher.name}</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between mb-3">
            <div>
              <p className="text-xs text-[#666666] ">잔액</p>
              <p className="text-lg font-bold">{voucher.remainingAmount.toLocaleString()}원</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#666666] ">총 금액</p>
              <p className="text-lg font-bold">{voucher.price.toLocaleString()}원</p>
            </div>
          </div>

          {/* 게이지 바 */}
          <div className="w-full bg-gray-200  rounded-full h-2 mb-3">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${isDisabled ? "bg-gray-400" : "bg-green-600"}`}
              style={{
                width: `${(voucher.remainingAmount / voucher.price) * 100}%`,
              }}
            />
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-[#666666] mr-2" />
            <p className="text-xs text-[#666666]">유효기간: {voucher.validDate}</p>
          </div>
        </div>
      </Link>

      {/* 첫 번째 삭제 확인 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn">
          <div className="bg-white  p-6 rounded-2xl shadow-xl w-[320px] animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">바우처 삭제</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100  transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-center py-6">
              <div className="bg-red-50  p-4 rounded-full">
                <Trash2 className="h-10 w-10 text-red-500 " />
              </div>
            </div>

            <p className="text-center mb-6">해당 바우처를 삭제하시겠습니까?</p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200   rounded-xl text-sm font-medium transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setIsConfirmModalOpen(true)
                }}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 두 번째 확인 모달 */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn">
          <div className="bg-white  p-6 rounded-2xl shadow-xl w-[320px] animate-scaleIn">
            {isDeleted ? (
              <div className="flex flex-col items-center py-8">
                <div className="bg-green-50  p-4 rounded-full mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">삭제 완료</h3>
                <p className="text-sm text-gray-500 ">바우처가 성공적으로 삭제되었습니다.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">최종 확인</h3>
                  <button
                    onClick={() => setIsConfirmModalOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100  transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-center py-4">
                  <div className="bg-amber-50  p-4 rounded-full">
                    <AlertTriangle className="h-10 w-10 text-amber-500 " />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-center font-medium mb-3">정말 삭제하시겠습니까?</p>
                  <p className="text-sm text-gray-500  text-center">
                    삭제 후 복구할 수 없으며 바우처를 삭제하면 남은 잔액이 환불되지 않습니다.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsConfirmModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200   rounded-xl text-sm font-medium transition-colors"
                    disabled={isDeleting}
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        삭제 중
                      </>
                    ) : (
                      "삭제"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
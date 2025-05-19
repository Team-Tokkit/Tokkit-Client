"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import PurchasePassword from "../../components/PurchasePassword"
import { purchaseVoucher } from "@/lib/api/voucher"
import { verifySimplePassword } from "@/app/payment/api/payment"
import { VirtualKeypadHandle } from "@/components/virtual-keypad"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function VoucherPurchaseVerifyPage() {
  const router = useRouter()
  const params = useSearchParams()
  const voucherId = Number(params.get("voucherId"))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [failCount, setFailCount] = useState(0)
  const keypadRef = useRef<VirtualKeypadHandle>(null)


  // 비밀번호 입력 완료 핸들러
  const handleComplete = async (input: string) => {
    if (!input) return
    setError(null)
    setLoading(true)

    try {
      const valid = await verifySimplePassword(input)

      // 비밀번호 검증 실패 시
      if (!valid) {
        // 비밀번호가 일치하지 않으면 비밀번호 입력 필드 초기화
        keypadRef.current?.reset()
        setFailCount((prev) => {
          const next = prev + 1
          if (next >= 5) {
            router.push("/mypage/reset-pin")
          }
          return next
        })

        setError("비밀번호가 일치하지 않습니다. 다시 입력해주세요.")
        return
      }

      // 비밀번호가 일치하면 바우처 구매 API 호출
      await purchaseVoucher({ voucherId, simplePassword: input })
      router.push("/wallet/voucher/purchase")
    } catch (e) {
      console.error(e)
      setError("구매에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  // 비밀번호 찾기 핸들러
  const handleForgotPassword = () => {
    router.push("/mypage/change-pin")
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-8">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex flex-col items-center bg-white px-8 py-6 rounded-lg shadow-lg">
            <svg
              className="animate-spin h-8 w-8 text-green-500 mb-3"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-base font-medium text-green-600">처리 중입니다. 잠시만 기다려주세요...</span>
          </div>
        </div>
      )}
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center mb-5">
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xl text-gray-700 font-bold ml-2">비밀번호 입력</span>
        </div>

        <Image
          src="/images/bunny-mascot.png"
          alt="바우처 마스코트"
          width={80}
          height={120}
          className="mb-4"
        />

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">간편 비밀번호 입력</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          바우처 구매를 위해 간편 비밀번호를 입력해주세요.
        </p>

        {failCount > 0 && (
          <p className="text-xs text-red-500 font-semibold text-center mb-4">
            오류 {failCount}/5
          </p>
        )}

        <div className="w-full">
          <PurchasePassword ref={keypadRef} onComplete={handleComplete} />
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

        <p
          className="text-sm text-gray-500 text-center mt-8 underline cursor-pointer hover:text-gray-700"
          onClick={handleForgotPassword}
        >
          비밀번호를 잊으셨나요?
        </p>
      </div>
    </div>
  )
}

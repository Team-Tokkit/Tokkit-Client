"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import PurchasePassword from "../../components/PurchasePassword"
import { purchaseVoucher } from "@/lib/api/voucher"
import { verifySimplePassword } from "@/app/payment/api/payment"

export default function VoucherPurchaseVerifyPage() {
  const router = useRouter()
  const params = useSearchParams()
  const voucherId = Number(params.get("voucherId"))

  const [password, setPassword] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleComplete = (input: string) => {
    setPassword(input)
    setError(null)
  }

  const handleConfirm = async () => {
    if (!password) return
    setLoading(true)
    try {
      const valid = await verifySimplePassword(password)
      if (!valid) {
        setError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.')
        return
      }
      await purchaseVoucher({ voucherId, simplePassword: password })
      router.push('/wallet/voucher/purchase')
    } catch (e) {
      setError('구매에 실패했습니다. 다시 시도해주세요.')
        console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">간편 비밀번호 입력</h2>
        <p className="text-gray-500 text-center mb-8">
          바우처 구매를 위해 간편 비밀번호를 입력해주세요.
        </p>

        <PurchasePassword onComplete={handleComplete} />

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <button
          onClick={handleConfirm}
          disabled={!password || loading}
          className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-200 disabled:opacity-50"
        >
          {loading ? '처리 중...' : '확인'}
        </button>
      </div>
    </div>
  )
}

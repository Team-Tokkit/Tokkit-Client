"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Clock } from "lucide-react"
import VoucherPurchaseCard from "@/app/vouchers/components/VoucherPurchaseCard"
import PurchaseTokenBalance from "@/app/vouchers/components/PurchaseTokenBalance"
import { Button } from "@/components/ui/button"
import { getVoucherDetails, getMyVouchers } from "@/lib/api/voucher"
import { fetchWalletInfo } from "@/app/dashboard/api/wallet-info"
import type { Voucher } from "@/app/vouchers/types/voucher"
import type { MyVoucher } from "@/app/my-vouchers/types/my-voucher"

export default function PurchasePage() {
  const router = useRouter()
  const params = useSearchParams()
  const voucherId = Number(params.get("voucherId"))

  const [voucher, setVoucher] = useState<Voucher | null>(null)
  const [methods, setMethods] = useState<MyVoucher[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const [walletInfo, setWalletInfo] = useState<{
    userName: string
    accountNumber: string
    tokenBalance: number
  } | null>(null)
  const [loadingWallet, setLoadingWallet] = useState(true)
  const [walletError, setWalletError] = useState<string | null>(null)

  useEffect(() => {
    if (voucherId) getVoucherDetails(voucherId).then(setVoucher)
    getMyVouchers().then((res) => setMethods(res.content))

    const token = localStorage.getItem("accessToken")!
    fetchWalletInfo(token)
      .then((data) =>
        setWalletInfo({
          userName: data.userName,
          accountNumber: data.accountNumber,
          tokenBalance: data.tokenBalance,
        }),
      )
      .catch(() => setWalletError("지갑 정보를 불러올 수 없습니다."))
      .finally(() => setLoadingWallet(false))
  }, [voucherId])

const handlePay = () => {
  if (!voucher) return;
  router.push(`/vouchers/purchase/verify?voucherId=${voucher.id}`);
};


  if (!voucher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center p-6 w-full max-w-lg">
          <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-64 w-full bg-gray-200 rounded-2xl mb-6 shadow-sm"></div>
          <div className="h-32 w-full bg-gray-200 rounded-2xl mb-6 shadow-sm"></div>
          <div className="h-24 w-full bg-gray-200 rounded-2xl mb-6 shadow-sm"></div>
          <div className="h-14 w-full bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }


  const hasEnoughBalance = walletInfo && walletInfo.tokenBalance >= voucher.price

  return (
    <div className="min-h-screen bg-[#F9FAFB]  pb-20">
      <div className="max-w-lg mx-auto p-6">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 px-2">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#FFB020] text-white flex items-center justify-center mb-1">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-gray-800">상품 선택</span>
          </div>
          <div className="flex-1 h-1 bg-[#FFB020] mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#FFB020] text-white flex items-center justify-center mb-1">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-gray-800">결제 확인</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center mb-1">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-xs text-gray-400">결제 완료</span>
          </div>
        </div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">구매 확인</h1>
            <p className="text-gray-500">구매 정보를 확인하고 결제를 진행해주세요</p>
          </div>

          {/* 1. 바우처 카드 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 overflow-hidden relative"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/30 rounded-full -mt-10 -mr-10"></div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <span className="bg-[#FFB020]/10 text-[#FFB020] w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">
                1
              </span>
              구매 상품
            </h2>
            <VoucherPurchaseCard voucher={voucher} />
          </motion.div>

          {/* 2. 토큰 잔액 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 overflow-hidden relative"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mt-10 -mr-10"></div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <span className="bg-[#FFB020]/10 text-[#FFB020] w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">
                2
              </span>
              결제 정보
            </h2>
            {loadingWallet ? (
              <div className="h-24 bg-gray-100 animate-pulse rounded-xl"></div>
            ) : walletError ? (
              <div className="p-4 bg-red-50 text-red-500 rounded-xl border border-red-100">{walletError}</div>
            ) : (
              walletInfo && (
                <PurchaseTokenBalance
                  userName={walletInfo.userName}
                  accountNumber={walletInfo.accountNumber}
                  tokenBalance={walletInfo.tokenBalance}
                  price={voucher.price}
                />
              )
            )}
          </motion.div>

          {/* 3. 결제 요약 */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 overflow-hidden relative"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/30 rounded-full -mt-10 -mr-10"></div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <span className="bg-[#FFB020]/10 text-[#FFB020] w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">
                3
              </span>
              결제 요약
            </h2>
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">상품 금액</span>
                <span className="font-medium">{voucher.price.toLocaleString()}원</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center text-[#FFB020]">
                  <span className="font-medium">총 결제 금액</span>
                  <span className="font-bold text-xl">{voucher.price.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. 결제 버튼 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Button
              size="lg"
              className={`w-full bg-[#FFB020] hover:bg-[#FF9500] text-white rounded-xl py-7 font-bold text-lg shadow-lg transition-all duration-300 ${isHovering ? "shadow-amber-200" : ""}`}
              onClick={handlePay}
              disabled={!hasEnoughBalance}
            >
              <motion.div
                className="flex items-center justify-center w-full"
                animate={{ x: isHovering ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span>결제하기</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Button>

            {!hasEnoughBalance && walletInfo && (
              <p className="text-red-500 text-sm text-center mt-2">잔액이 부족합니다. 충전이 필요합니다.</p>
            )}
          </motion.div>

          {/* 5. 안내 메시지 */}
          <div className="flex items-center justify-center text-xs text-gray-500 mt-4 bg-gray-50 p-3 rounded-xl">
            <ShieldCheck className="h-4 w-4 mr-2 text-[#FFB020]" />
            <span>안전한 결제를 위해 개인정보는 암호화되어 처리됩니다</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface MerchantSignupFormProps {
  onBackToCustomer: () => void
}

export default function MerchantSignupForm({ onBackToCustomer }: MerchantSignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // 실제 회원가입 로직 구현 (여기서는 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center mb-4 bg-[#F5F5F5] dark:bg-[#2A2A2A] p-3 rounded-lg">
        <Store className="h-5 w-5 text-[#FFB020] dark:text-[#FFD485] mr-2" />
        <span className="text-sm font-medium text-[#1A1A1A] dark:text-white">가맹점주 회원가입</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="business-number" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
            사업자 등록번호
          </Label>
          <Input
            id="business-number"
            placeholder="사업자 등록번호를 입력하세요"
            className="h-10 rounded-lg border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="store-name" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
            상호명
          </Label>
          <Input
            id="store-name"
            placeholder="상호명을 입력하세요"
            className="h-10 rounded-lg border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchant-email" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
            이메일
          </Label>
          <Input
            id="merchant-email"
            type="email"
            placeholder="이메일을 입력하세요"
            className="h-10 rounded-lg border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchant-password" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
            비밀번호
          </Label>
          <div className="relative">
            <Input
              id="merchant-password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              className="h-10 rounded-lg border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] dark:text-[#777777] hover:text-[#666666] dark:hover:text-[#BBBBBB] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-[#999999] dark:text-[#777777]">8자 이상, 영문, 숫자, 특수문자 포함</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchant-confirm-password" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
            비밀번호 확인
          </Label>
          <div className="relative">
            <Input
              id="merchant-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 입력하세요"
              className="h-10 rounded-lg border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] dark:text-[#777777] hover:text-[#666666] dark:hover:text-[#BBBBBB] transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="merchant-terms"
              required
              className="border-[#CCCCCC] dark:border-[#444444] data-[state=checked]:bg-[#FFB020] dark:data-[state=checked]:bg-[#FFD485] data-[state=checked]:border-[#FFB020] dark:data-[state=checked]:border-[#FFD485]"
            />
            <Label htmlFor="merchant-terms" className="text-xs font-normal text-[#666666] dark:text-[#BBBBBB]">
              <span>이용약관 및 개인정보처리방침에 동의합니다</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="merchant-marketing"
              className="border-[#CCCCCC] dark:border-[#444444] data-[state=checked]:bg-[#FFB020] dark:data-[state=checked]:bg-[#FFD485] data-[state=checked]:border-[#FFB020] dark:data-[state=checked]:border-[#FFD485]"
            />
            <Label htmlFor="merchant-marketing" className="text-xs font-normal text-[#666666] dark:text-[#BBBBBB]">
              <span>마케팅 정보 수신에 동의합니다 (선택)</span>
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-10 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A] font-medium rounded-lg shadow-md shadow-[#FFB020]/20 dark:shadow-[#FFD485]/10 mt-2"
          disabled={loading}
        >
          {loading ? "가입 중..." : "가맹점주 회원가입"}
        </Button>
      </form>
    </div>
  )
}

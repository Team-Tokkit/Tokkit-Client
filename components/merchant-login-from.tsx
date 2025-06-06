"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface MerchantLoginFormProps {
  onBackToCustomer: () => void
}

export default function MerchantLoginForm({ onBackToCustomer }: MerchantLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // 실제 로그인 로직 구현 (여기서는 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div>
      <div className="flex items-center mb-4 bg-[#F5F5F5]  p-3 rounded-lg">
        <Store className="h-5 w-5 text-[#FFB020]  mr-2" />
        <span className="text-sm font-medium text-[#1A1A1A] ">가맹점주 로그인</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="merchant-id" className="text-[#444444]  text-sm font-medium">
            사업자 번호
          </Label>
          <Input
            id="merchant-id"
            placeholder="사업자 번호를 입력하세요"
            className="h-10 rounded-lg border-[#E0E0E0]  bg-white  focus-visible:ring-[#FFD485]  focus-visible:ring-offset-0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchant-password" className="text-[#444444]  text-sm font-medium">
            비밀번호
          </Label>
          <div className="relative">
            <Input
              id="merchant-password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              className="h-10 rounded-lg border-[#E0E0E0]  bg-white  focus-visible:ring-[#FFD485]  focus-visible:ring-offset-0 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999]  hover:text-[#666666]  transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="merchant-remember"
            className="border-[#CCCCCC]  data-[state=checked]:bg-[#FFB020]  data-[state=checked]:border-[#FFB020] "
          />
          <Label htmlFor="merchant-remember" className="text-xs font-normal text-[#666666] ">
            로그인 상태 유지
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-10 bg-[#FFB020] hover:bg-[#FF9500]   text-white  font-medium rounded-lg shadow-md shadow-[#FFB020]/20 "
          disabled={loading}
        >
          {loading ? "로그인 중..." : "가맹점주 로그인"}
        </Button>
      </form>
    </div>
  )
}

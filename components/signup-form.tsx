"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface SignupFormProps {
  onComplete?: () => void
}

export function SignupForm({ onComplete }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 간단한 유효성 검사
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      return
    }

    if (!termsAgreed) {
      setError("이용약관에 동의해주세요.")
      return
    }

    setLoading(true)

    // 실제로는 API 호출하여 회원가입 처리
    try {
      // 회원가입 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 회원가입 성공 시 콜백 호출
      if (onComplete) {
        onComplete()
      }
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
          아이디
        </Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디를 입력하세요"
          className="h-12 rounded-xl border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          className="h-12 rounded-xl border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
          비밀번호
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="h-12 rounded-xl border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0 pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] dark:text-[#777777] hover:text-[#666666] dark:hover:text-[#BBBBBB] transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <p className="text-xs text-[#999999] dark:text-[#777777]">8자 이상, 영문, 숫자, 특수문자 포함</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
          비밀번호 확인
        </Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            className="h-12 rounded-xl border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0 pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] dark:text-[#777777] hover:text-[#666666] dark:hover:text-[#BBBBBB] transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={termsAgreed}
            onCheckedChange={(checked) => setTermsAgreed(checked === true)}
            className="border-[#CCCCCC] dark:border-[#444444] data-[state=checked]:bg-[#FFB020] dark:data-[state=checked]:bg-[#FFD485] data-[state=checked]:border-[#FFB020] dark:data-[state=checked]:border-[#FFD485]"
          />
          <Label htmlFor="terms" className="text-xs font-normal text-[#666666] dark:text-[#BBBBBB]">
            <span>이용약관 및 개인정보처리방침에 동의합니다</span>
          </Label>
        </div>
      </div>

      {error && (
        <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A] font-medium rounded-xl shadow-md shadow-[#FFB020]/20 dark:shadow-[#FFD485]/10 mt-4"
        disabled={loading}
      >
        {loading ? "가입 중..." : "회원가입"}
      </Button>
    </form>
  )
}

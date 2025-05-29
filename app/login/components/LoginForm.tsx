"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLogin } from "@/app/login/api/use-login"

export default function LoginForm() {
  const router = useRouter()
  const { login } = useLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err: any) {
      alert(err.message ?? "로그인 실패")
    } finally {
      setLoading(false)
    }
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#444444]  text-sm font-medium">
            아이디
          </Label>
          <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="아이디를 입력하세요"
              className="h-10 rounded-lg border-[#E0E0E0]  bg-white  focus-visible:ring-[#FFD485]  focus-visible:ring-offset-0"
              required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[#444444]  text-sm font-medium">
              비밀번호
            </Label>
            <button
                type="button"
                className="text-xs text-[#FFB020] hover:text-[#FF9500]   transition-colors"
                onClick={() => router.push("/reset-password")}
            >
              비밀번호 찾기
            </button>
          </div>
          <div className="relative">
            <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

        <Button
            type="submit"
            className="w-full h-10 bg-[#FFB020] hover:bg-[#FF9500]   text-white  font-medium rounded-lg shadow-md shadow-[#FFB020]/20 "
            disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </form>
  )
}

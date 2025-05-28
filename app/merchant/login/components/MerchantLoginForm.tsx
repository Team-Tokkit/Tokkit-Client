"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { loginMerchant } from "@/app/merchant/login/api/merchant-login"

export default function MerchantLoginForm() {
    const router = useRouter()
    const [businessId, setBusinessId] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const formatBusinessNumber = (value: string) => {
        const onlyNums = value.replace(/\D/g, "").slice(0, 10)
        if (onlyNums.length >= 6) {
            return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 5)}-${onlyNums.slice(5)}`
        } else if (onlyNums.length >= 4) {
            return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
        } else {
            return onlyNums
        }
    }

    const handleBusinessIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatBusinessNumber(e.target.value)
        setBusinessId(formatted)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await loginMerchant({
                businessNumber: businessId,
                password: password,
            })
            router.push("/merchant/dashboard")
        } catch (err: any) {
            alert(err.message || "로그인 중 문제가 발생했습니다.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="businessId" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
                    사업자 등록번호
                </Label>
                <Input
                    id="businessId"
                    value={businessId}
                    onChange={handleBusinessIdChange}
                    placeholder="000-00-00000"
                    className="h-12 rounded-xl border-[#E0E0E0] dark:border-[#333333] bg-white dark:bg-[#1E1E1E] focus-visible:ring-[#FFD485] dark:focus-visible:ring-[#FFB020] focus-visible:ring-offset-0"
                    required
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
                        비밀번호
                    </Label>
                    <button
                        type="button"
                        className="text-xs text-[#FFB020] hover:text-[#FF9500] dark:text-[#FFD485] dark:hover:text-[#FFE8CC] transition-colors"
                        onClick={() => router.push("/merchant/reset-password")}
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
            </div>

            <Button
                type="submit"
                className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A] font-medium rounded-xl shadow-md shadow-[#FFB020]/20 dark:shadow-[#FFD485]/10 mt-4"
                disabled={loading}
            >
                {loading ? "로그인 중..." : "로그인"}
            </Button>
        </form>
    )
}

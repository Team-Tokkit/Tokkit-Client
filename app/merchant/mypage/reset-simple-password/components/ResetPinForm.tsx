"use client"

import { FormEvent } from "react"
import { Mail, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Props {
    email: string
    setEmail: (email: string) => void
    onSubmit: (e: FormEvent) => void
    loading: boolean
}

export default function ResetPinForm({ email, setEmail, onSubmit, loading }: Props) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    이메일
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="가입한 이메일을 입력하세요"
                    required
                    disabled={loading}
                    className="h-12 rounded-lg border-gray-300 focus:border-[#FFB020] focus:ring-[#FFB020]"
                />
            </div>

            <Button
                type="submit"
                className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        처리 중...
                    </>
                ) : (
                    "비밀번호 재설정 요청"
                )}
            </Button>
        </form>
    )
}

"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import type React from "react"

interface ResetPasswordFormProps {
    businessId: string
    setBusinessId: (value: string) => void
    handleSubmit: (e: React.FormEvent) => void
    loading: boolean
}

export default function ResetPasswordForm({
                                              businessId,
                                              setBusinessId,
                                              handleSubmit,
                                              loading,
                                          }: ResetPasswordFormProps) {
    return (
        <>
            <div className="mb-6 flex justify-center">
                <Image
                    src="/images/password-reset-mascot.png"
                    alt="가맹점 로고"
                    width={200}
                    height={200}
                    className="rounded-full"
                />
            </div>

            <h2 className="text-xl font-bold text-center mb-4 text-[#1A1A1A] dark:text-white">비밀번호 찾기</h2>
            <p className="text-sm text-[#666666] dark:text-[#BBBBBB] text-center mb-6">
                가입하신 사업자 등록번호를 입력하시면 등록된 이메일로 임시 비밀번호를 발급해 드립니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="businessId" className="text-[#444444] dark:text-[#BBBBBB] text-sm font-medium">
                        사업자 등록번호
                    </Label>
                    <Input
                        id="businessId"
                        value={businessId}
                        onChange={(e) => setBusinessId(e.target.value)}
                        placeholder="사업자 등록번호를 입력하세요"
                        required
                        disabled={loading}
                        className="h-12 rounded-xl border-[#E0E0E0] dark:border-[#333333] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white  font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            처리 중...
                        </>
                    ) : (
                        "임시 비밀번호 발급하기"
                    )}
                </Button>
            </form>
        </>
    )
}

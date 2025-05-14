"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { BackButton } from "@/components/back-button"
import { PageHeader } from "@/components/page-header"
import Image from "next/image";

export default function ResetPasswordPage() {
    const router = useRouter()
    const [step, setStep] = useState<"email" | "complete">("email")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    // 임시 비밀번호 발급 처리
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !email.includes("@")) {
            toast({
                title: "이메일 오류",
                description: "올바른 이메일 주소를 입력해주세요.",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        try {
            // 실제로는 API 호출하여 비밀번호 초기화 처리
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // 완료 단계로 이동
            setStep("complete")

            toast({
                title: "임시 비밀번호 발급 완료",
                description: `${email}로 임시 비밀번호가 발송되었습니다.`,
            })
        } catch (error) {
            toast({
                title: "오류 발생",
                description: "임시 비밀번호 발급 중 오류가 발생했습니다. 다시 시도해주세요.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    // 완료 후 로그인 페이지로 이동
    const handleComplete = () => {
        router.push("/login")
    }

    // 페이지 진입 애니메이션
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
            {/* 헤더 */}
            <header className="p-4 flex items-center">
                <BackButton href="/login" />
                <PageHeader title="비밀번호 찾기" />
            </header>

            {/* 컨텐츠 */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xs">
                    {step === "email" && (
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-center my-6 -mt-36">
                                <Image
                                    src="/images/password-reset-mascot.png"
                                    alt="Tokkit Mascot"
                                    width={200}
                                    height={200}
                                    className="rounded-full"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-center mb-6">비밀번호 찾기</h2>
                            <p className="text-sm text-[#666666] text-center mb-6">
                                가입하신 이메일을 입력하시면 임시 비밀번호를 발급해 드립니다.
                            </p>

                            <form onSubmit={handleResetPassword} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">이메일</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="가입한 이메일을 입력하세요"
                                        required
                                        disabled={loading}
                                        className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
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
                        </motion.div>
                    )}

                    {step === "complete" && (
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="mb-6 inline-block"
                            >
                                <CheckCircle className="h-24 w-24 text-green-500" />
                            </motion.div>

                            <h2 className="text-xl font-bold mb-2">비밀번호 초기화 완료</h2>
                            <p className="text-[#666666] mb-6">
                                임시 비밀번호가 <span className="font-semibold">{email}</span>로 발송되었습니다.
                                <br />
                                메일함을 확인해 주세요.
                            </p>

                            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                                <p className="text-sm text-gray-600">임시 비밀번호로 로그인 후 보안을 위해 비밀번호를 변경해주세요.</p>
                            </div>

                            <Button
                                className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
                                onClick={handleComplete}
                            >
                                로그인 화면으로 돌아가기
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

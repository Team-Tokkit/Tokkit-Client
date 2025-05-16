"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import ResetPinHeader from "@/app/mypage/reset-pin/components/ResetPinHeader"
import ResetPinForm from "@/app/mypage/reset-pin/components/ResetPinForm"
import ResetPinComplete from "@/app/mypage/reset-pin/components/ResetPinComplete"
import { sendSimplePasswordResetEmail } from "@/app/mypage/reset-pin/api/reset-simple-password"

export default function ResetPinPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [isComplete, setIsComplete] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
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
            await sendSimplePasswordResetEmail(email)

            setIsComplete(true)
            toast({
                title: "비밀번호 재설정 완료",
                description: "새로운 간편 비밀번호가 이메일로 발송되었습니다.",
            })
        } catch (error: any) {
            toast({
                title: "전송 실패",
                description: error?.message || "비밀번호 재설정 중 오류가 발생했습니다.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleComplete = () => {
        router.push("/mypage")
    }

    const pageVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col max-w-md mx-auto">
            <ResetPinHeader />

            <div className="flex-1 flex flex-col items-center justify-start p-6 pt-0">
                <div className="w-full">
                    {!isComplete ? (
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <div className="mb-8">
                                <Image
                                    src="/images/bunny-lock.png"
                                    alt="비밀번호 찾기"
                                    width={140}
                                    height={140}
                                    className="mx-auto mb-6"
                                />
                                <h2 className="text-xl font-bold text-[#111827] mb-2">간편 비밀번호 찾기</h2>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                    가입하신 이메일을 입력하시면 새로운 간편 비밀번호를 이메일로 발송해 드립니다.
                                </p>
                            </div>

                            <ResetPinForm
                                email={email}
                                setEmail={setEmail}
                                onSubmit={handleSubmit}
                                loading={loading}
                            />

                            <p className="mt-6 text-xs text-gray-500">
                                * 이메일로 전송된 새 비밀번호로 로그인 후, 보안을 위해 비밀번호를 변경해주세요.
                            </p>
                        </motion.div>
                    ) : (
                        <ResetPinComplete email={email} onDone={handleComplete} />
                    )}
                </div>
            </div>
        </div>
    )
}

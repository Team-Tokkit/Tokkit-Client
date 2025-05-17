"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { BackButton } from "@/components/back-button"
import { PageHeader } from "@/components/page-header"
import Image from "next/image";
import ResetPasswordForm from "@/app/reset-password/components/ResetPasswordFrom";
import ResetPasswordResult from "@/app/reset-password/components/ResetPasswordResult";
import {requestTempPassword} from "@/app/reset-password/api/reset-password-auth";

export default function ResetPasswordPage() {
    const router = useRouter()
    const [step, setStep] = useState<"email" | "complete">("email")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    // 임시 비밀번호 발급 처리
    const handleResetPassword = async (email: string): Promise<string | null> => {
        setLoading(true);
        try {
            await requestTempPassword(email);
            setStep("complete");
            return null;
        } catch (err: any) {
            return err.message || "오류가 발생했습니다.";
        } finally {
            setLoading(false);
        }
    };

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
                            <ResetPasswordForm
                                email={email}
                                setEmail={setEmail}
                                loading={loading}
                                onSubmit={handleResetPassword}
                            />
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

                            <ResetPasswordResult
                                email={email}
                                onComplete={handleComplete}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

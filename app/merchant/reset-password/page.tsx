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
import Header from "@/components/common/Header"
import Image from "next/image"
import ResetPasswordForm from "@/app/merchant/reset-password/components/ResetPasswordForm";
import ResetPasswordComplete from "@/app/merchant/reset-password/components/ResetPasswordComplete";
import {requestTempPassword} from "@/app/merchant/reset-password/api/reset-password-auth";

export default function MerchantResetPasswordPage() {
    const router = useRouter()
    const [step, setStep] = useState<"business" | "complete">("business")
    const [businessNumber, setBusinessNumber] = useState("")
    const [email, setEmail] = useState("") // 백엔드에서 찾은 이메일을 저장 (실제로는 마스킹된 이메일이 표시됨)
    const [loading, setLoading] = useState(false)

    // 임시 비밀번호 발급 처리
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!businessNumber || businessNumber.length < 10) {
            toast({
                title: "사업자 등록번호 오류",
                description: "올바른 사업자 등록번호를 입력해주세요.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const result = await requestTempPassword(businessNumber); // 백엔드 응답에서 email 추출
            const email = result.result.email;

            console.log(email);

            // 이메일 마스킹 처리
            const maskedEmail = email.replace(/(\w{3})[\w.-]+@([\w.]+)/, "$1***@$2");
            setEmail(maskedEmail);

            console.log(maskedEmail);

            // 완료 단계로 이동
            setStep("complete");

            toast({
                title: "임시 비밀번호 발급 완료",
                description: `${maskedEmail}로 임시 비밀번호가 발송되었습니다.`,
            });
        } catch (error: any) {
            toast({
                title: "오류 발생",
                description: error.message || "임시 비밀번호 발급 중 오류가 발생했습니다.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // 완료 후 로그인 페이지로 이동
    const handleComplete = () => {
        router.push("/merchant/login")
    }

    // 페이지 진입 애니메이션
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA]  flex flex-col">
            {/* 헤더 */}
            <Header title="비밀번호 찾기"/>

            {/* 컨텐츠 */}
            <div className="flex-1 flex flex-col items-center p-6">
                <div className="w-full max-w-xs">
                    {step === "business" && (
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={{ duration: 0.3 }}
                        >
                            <ResetPasswordForm
                                businessId={businessNumber}
                                setBusinessId={setBusinessNumber}
                                handleSubmit={handleResetPassword}
                                loading={loading}
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
                            <ResetPasswordComplete
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SimplePasswordStep from "@/app/merchant/signup/wallet/password/components/SimplePasswordStep";
import { submitMerchantContactInfo } from "@/app/merchant/signup/wallet/contact/api/register-auth";
import Link from "next/link";
import Image from "next/image";

export default function PasswordSetupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (simplePassword: string) => {
        try {
            const user = JSON.parse(sessionStorage.getItem("signupPayload") || "{}")
            const business = JSON.parse(sessionStorage.getItem("businessInfo") || "{}")

            // 필수 값 누락 검사
            if (
                !user.email || !user.password || !user.phoneNumber || !user.name ||
                !business.businessNumber || !business.storeName || !business.roadAddress ||
                !business.sido || !business.sigungu || !business.category
            ) {
                alert("입력 정보가 유실되었습니다. 다시 시도해주세요.")
                return router.push("/merchant/signup/wallet/contact")
            }

            setIsLoading(true)

            const response = await submitMerchantContactInfo({
                name: user.name,
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
                simplePassword,

                businessNumber: business.businessNumber,
                storeName: business.storeName,
                roadAddress: business.roadAddress,
                sidoName: business.sido,
                sigunguName: business.sigungu,
                storeCategory: business.category,
            })

            console.log("회원가입 응답:", response)

            const accountNumber = response.result.accountNumber
            sessionStorage.setItem("accountNumber", accountNumber)

            sessionStorage.removeItem("signupPayload")
            sessionStorage.removeItem("businessInfo")
            sessionStorage.removeItem("verifiedName")

            router.push("/merchant/signup/wallet/complete")
        } catch (err) {
            console.error(err)
            alert("회원가입에 실패했습니다. 다시 시도해주세요.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#F9FAFB]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }}
            transition={{ duration: 0.3 }}
        >
            <header className="p-4 flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5 text-[#1A1A1A]" />
                </Button>
                <motion.h1
                    className="text-xl font-bold text-[#1A1A1A]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    간편 비밀번호 설정
                </motion.h1>
            </header>

            <motion.div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-xs">
                    <div className="w-full max-w-md">
                        <div className="flex justify-center mb-6">
                            <Link href="/">
                                <Image src="/images/bunny-mascot.png" alt="Tokkit Logo" width={100} height={100} priority />
                            </Link>
                        </div>

                        <SimplePasswordStep onComplete={handleSubmit} isLoading={isLoading} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

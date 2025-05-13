"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SimplePasswordStep from "@/app/signup/wallet/password/components/SimplePasswordStep";
import { submitContactInfo } from "@/app/signup/wallet/contact/api/auth";
import Link from "next/link";
import Image from "next/image";

export default function PasswordSetupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (simplePassword: string) => {
        try {
            const payload = JSON.parse(sessionStorage.getItem("signupPayload") || "{}") as {
                email: string;
                password: string;
                phoneNumber: string;
                name: string;
            };

            if (!payload.email || !payload.password || !payload.phoneNumber || !payload.name) {
                alert("이전 입력 정보가 유실되었습니다.");
                return router.push("/signup/wallet/contact");
            }

            setIsLoading(true);

            const response = await submitContactInfo({
                email: payload.email,
                password: payload.password,
                phoneNumber: payload.phoneNumber,
                name: payload.name,
                simplePassword,
            });

            const accountNumber = response.result.accountNumber;
            sessionStorage.setItem("accountNumber", accountNumber);

            sessionStorage.removeItem("signupPayload");
            sessionStorage.removeItem("verifiedName");

            router.push("/signup/complete");
        } catch (err) {
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

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

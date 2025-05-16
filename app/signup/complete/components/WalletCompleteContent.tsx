"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AccountNumberCard from "./AccountNumberCard";
import UsageGuideList from "./UsageGuideList";
import CompleteFooterButton from "./CompleteFooterButton";
import confetti from "canvas-confetti" // 테무폭죽 Import

export default function WalletCompleteContent() {
    const router = useRouter();
    const [accountNumber, setAccountNumber] = useState("");
    const [isMerchant, setIsMerchant] = useState(false);
    const [businessName, setBusinessName] = useState("");

    // 테무 폭죽
    useEffect(() => {
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min
        }

        const interval: NodeJS.Timeout = setInterval(() => {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)

            // 왼쪽과 오른쪽에서 컨페티 발사
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        }, 250)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const storedAccountNumber = sessionStorage.getItem("accountNumber");
        if (storedAccountNumber) {
            setAccountNumber(storedAccountNumber);
        }

        const userType = sessionStorage.getItem("userType");
        if (userType === "merchant") {
            setIsMerchant(true);
            const businessInfoStr = sessionStorage.getItem("businessInfo");
            if (businessInfoStr) {
                try {
                    const businessInfo = JSON.parse(businessInfoStr);
                    setBusinessName(businessInfo.businessName || "");
                } catch (e) {
                    console.error("Failed to parse business info", e);
                }
            }
        }
    }, []);


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { when: "beforeChildren", staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.div
            className="min-h-screen bg-white flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="flex justify-center mt-8 mb-4" variants={itemVariants}>
                <Image src="/images/tokkit-logo.png" alt="Tokkit 로고" width={120} height={40} className="h-10 w-auto" />
            </motion.div>

            <motion.div className="flex justify-center mb-4" variants={itemVariants}>
                <Image
                    src={isMerchant ? "/images/store-mascot.png" : "/images/bunny-mascot.png"}
                    alt="마스코트"
                    width={120}
                    height={120}
                    className="h-28 w-auto"
                />
            </motion.div>

            <motion.div className="text-center px-6 mb-8" variants={itemVariants}>
                <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">전자지갑 개설 완료</h1>
                <p className="text-[#666666]">
                    {isMerchant
                        ? `${businessName} 가맹점의 전자지갑이 성공적으로 개설되었습니다.`
                        : "전자지갑이 성공적으로 개설되었습니다."}
                </p>
            </motion.div>

            <AccountNumberCard
                accountNumber={accountNumber}
                isMerchant={isMerchant}
                businessName={businessName}
            />

            <UsageGuideList isMerchant={isMerchant} businessName={businessName} />

            <CompleteFooterButton isMerchant={isMerchant} />
        </motion.div>
    );
}

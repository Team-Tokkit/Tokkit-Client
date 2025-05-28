"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ChangePasswordHeader from "@/app/mypage/change-password/components/ChangePasswordHeader"
import ChangePasswordForm from "@/app/mypage/change-password/components/ChangePasswordForm"
import ChangePasswordSuccess from "@/app/mypage/change-password/components/ChangePasswordSuccess"

export default function ChangePasswordPage() {
    const [step, setStep] = useState<"form" | "success">("form")

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <div className="bg-[#F9FAFB] h-[100dvh] px-4 flex flex-col">
        <ChangePasswordHeader />
        <div className="flex-1 flex items-center justify-center">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {step === "form" ? (
                    <ChangePasswordForm onSuccess={() => setStep("success")} />
                ) : (
                    <ChangePasswordSuccess />
                )}
            </motion.div>
        </div>
    </div>
    )
}

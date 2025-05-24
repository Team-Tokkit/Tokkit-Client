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
        <div className="min-h-screen bg-[#F9FAFB] py-8 px-4">
            <div className="max-w-md mx-auto">
                <ChangePasswordHeader />
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

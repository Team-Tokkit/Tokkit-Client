"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import MerchantInfoHeader from "@/app/merchant/mypage/info/components/MerchantInfoHeader";
import {getMerchantInfo} from "@/app/merchant/mypage/api/merchant-info";
import MerchantInfoCard from "@/app/merchant/mypage/info/components/MerchantInfoCard";

export default function MerchantProfileEditPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [merchant, setMerchant] = useState({
        storeName: "",
        name: "",
        email: "",
        businessNumber: "",
        phoneNumber: "",
        roadAddress: "",
        storeCategory: "",
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    }

    useEffect(() => {
        getMerchantInfo()
            .then((data) => {
                setMerchant(data)
            })
            .catch((err) => {
                console.error("가맹점주 정보 불러오기 실패:", err)
            })
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-md mx-auto">
                <MerchantInfoHeader />

                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                   <div >
                        <MerchantInfoCard merchant={merchant} />
                   </div>
                </motion.div>
            </div>
        </div>
    )
}

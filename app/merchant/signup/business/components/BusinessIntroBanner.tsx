"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function BusinessIntroBanner() {
    return (
        <>
            <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Image
                    src="/images/merchant-bunny.png"
                    alt="가맹점 마스코트"
                    width={120}
                    height={120}
                    className="h-28 w-auto"
                />
            </motion.div>

            <motion.h2
                className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                사업자등록증 촬영
            </motion.h2>

            <motion.p
                className="text-sm text-[#666666] dark:text-[#BBBBBB] mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                사업자등록증을 촬영하거나 이미지를 업로드해주세요
            </motion.p>
        </>
    )
}

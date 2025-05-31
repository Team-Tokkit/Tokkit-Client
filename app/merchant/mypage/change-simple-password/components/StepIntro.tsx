"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface Props {
    title: string
    subtitle: string
    failCount?: number
}

export default function StepIntro({ title, subtitle, failCount = 0 }: Props) {
    return (
        <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Image
                src="/images/bunny-lock.png"
                alt="Security Mascot"
                width={120}
                height={120}
                className="mx-auto mb-6"
            />
            <h2 className="text-xl font-bold text-[#111827] mb-2">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
            {failCount > 0 && (
                <p className="text-xs text-red-500 font-semibold text-center mt-2">비밀번호 오류 {failCount}/5</p>
            )}
        </motion.div>
    )
}

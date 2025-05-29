"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface Props {
    title: string
    subtitle: string
}

export default function StepIntro({ title, subtitle }: Props) {
    return (
        <motion.div
            className="text-center"
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
            <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
        </motion.div>
    )
}

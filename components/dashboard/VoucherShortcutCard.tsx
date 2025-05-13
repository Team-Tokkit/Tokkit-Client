"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface VoucherShortcutCardProps {
    icon: ReactNode
    title: string
    description: string
    href: string
    color: string
}

export default function VoucherShortcutCard({
                                                icon,
                                                title,
                                                description,
                                                href,
                                                color,
                                            }: VoucherShortcutCardProps) {
    const router = useRouter()

    return (
        <motion.div
            className="bg-white rounded-xl p-4 shadow-sm flex flex-col cursor-pointer"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push(href)}
        >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${color}20` }}>
                {icon}
            </div>
            <h4 className="text-base font-bold text-[#1A1A1A]">{title}</h4>
            <p className="text-xs text-[#666666] mt-1">{description}</p>
        </motion.div>
    )
}

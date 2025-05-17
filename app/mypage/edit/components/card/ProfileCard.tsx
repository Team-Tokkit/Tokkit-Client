"use client"

import { Card } from "@/components/ui/card"
import { ReactNode } from "react"
import { motion } from "framer-motion"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

interface ProfileCardProps {
    children: ReactNode
}

export default function ProfileCard({ children }: ProfileCardProps) {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Card className="shadow-lg border-0 overflow-hidden">
                {children}
            </Card>
        </motion.div>
    )
}

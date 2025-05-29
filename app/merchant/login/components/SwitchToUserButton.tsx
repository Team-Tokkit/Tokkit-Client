"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function SwitchToUserButton() {
    const router = useRouter()
    return (
        <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <button
                className="text-sm text-[#666666]  hover:text-[#FFB020]  transition-colors"
                onClick={() => router.push("/login")}
            >
                일반 사용자이신가요?
            </button>
        </motion.div>
    )
}

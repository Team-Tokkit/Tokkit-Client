"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface TermsAlertProps {
    show: boolean
}

export default function TermsAlert({ show }: TermsAlertProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center text-red-500 dark:text-red-400 shadow-sm"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <p className="text-sm">모든 필수 약관에 동의해야 진행할 수 있습니다.</p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function SuccessNotice() {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center"
        >
            <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">저장 완료!</h3>
            <p className="text-gray-600 mb-6">프로필 정보가 성공적으로 업데이트되었습니다.</p>
            <p className="text-sm text-gray-500">잠시 후 마이페이지로 이동합니다...</p>
        </motion.div>
    )
}

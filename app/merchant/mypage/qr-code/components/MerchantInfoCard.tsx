"use client"

import { Store } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
    name: string
    address: string
}

export default function MerchantInfoCard({ name, address }: Props) {
    return (
        <motion.div
            className="bg-white rounded-xl shadow-sm p-3 border border-gray-100 flex-shrink-0 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <div className="flex items-center justify-center">
                <Store className="h-4 w-4 text-[#FFB020] mr-2" />
                <div className="text-center">
                    <h2 className="text-base font-semibold text-gray-800">{name}</h2>
                    <p className="text-xs text-gray-600">{address}</p>
                </div>
            </div>
        </motion.div>
    )
}

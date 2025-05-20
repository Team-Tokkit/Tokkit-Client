"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function MerchantLogo() {
    return (
        <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
            <Image
                src="/images/merchant-bunny.png"
                alt="Tokkit Merchant Logo"
                width={200}
                height={200}
                className="mx-auto h-28 w-28"
            />
        </motion.div>
    )
}

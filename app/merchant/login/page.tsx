"use client"

import { motion } from "framer-motion"
import MerchantLoginHeader from "./components/MerchantLoginHeader"
import MerchantLogo from "./components/MerchantLogo"
import MerchantLoginForm from "./components/MerchantLoginForm"
import SwitchToUserButton from "./components/SwitchToUserButton"

export default function MerchantLoginPage() {
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    }

    return (
        <motion.div
            className="h-screen bg-[#FAFAFA]  flex flex-col"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
        >
            <MerchantLoginHeader />
            <div className="flex-1 flex flex-col items-center justify-center pt-12 p-6">
                <div className="w-full max-w-xs">
                    <MerchantLogo />
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <MerchantLoginForm />
                    </motion.div>
                    <SwitchToUserButton />
                </div>
            </div>
        </motion.div>
    )
}

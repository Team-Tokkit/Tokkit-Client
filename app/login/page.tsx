"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import MobileLayout from "../mobile-layout"
import LoginHeader from "@/app/login/components/LoginHeader"
import LoginForm from "@/app/login/components/LoginForm"

export default function LoginPage() {
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    }

    return (
        <MobileLayout>
            <motion.div
                className="min-h-screen flex flex-col"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
            >
                <LoginHeader />
                <div className="flex-1 flex flex-col items-center pt-12 p-6">
                    <div className="w-full max-w-xs">
                        <motion.div
                            className="mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        >
                            <Image
                                src="/images/bunny-mascot.png"
                                alt="Tokkit Logo"
                                width={120}
                                height={120}
                                className="mx-auto h-28 w-28"
                            />
                        </motion.div>

                        <LoginForm />

                        <motion.div
                            className="mt-4 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <button
                                className="text-sm text-[#666666] hover:text-[#FFB020] transition-colors"
                                onClick={() => location.href = "/merchant/login"}
                            >
                                가맹점주이신가요?
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </MobileLayout>
    )
}

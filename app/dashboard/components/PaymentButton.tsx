"use client"

import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function FloatingPaymentButton() {
    const router = useRouter()

    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 pb-6 pt-2 bg-gradient-to-t from-[#F9FAFB] to-transparent z-50">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                    data-testid="floating-payment-button"
                    className="w-full h-12 bg-gradient-to-r from-[#FFB020] to-[#FF9500] hover:from-[#FFA000] hover:to-[#FF8500] text-white rounded-xl font-medium text-base shadow-lg flex items-center justify-center"
                    onClick={() => router.push("/payment")}
                >
                    <CreditCard className="h-5 w-5 mr-2" />
                    결제하기
                </Button>
            </motion.div>
        </div>
    )
}

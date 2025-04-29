"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PanInfo } from "framer-motion";

export default function PaymentDrawer() {
    const router = useRouter();

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset, velocity } = info;
        if (offset.y < -50 || velocity.y < -500) {
            router.push("/payment");
        }
    };

    return (
        <motion.div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.7 }}>
            <motion.div className="bg-[#FFB020] text-white rounded-t-xl shadow-lg" drag="y" dragConstraints={{ top: 0, bottom: 0 }} onDragEnd={handleDragEnd} transition={{ type: "spring", damping: 25, stiffness: 300 }}>
                <div className="flex items-center justify-center py-2">
                    <div className="w-10 h-1 bg-white/30 rounded-full" />
                </div>
                <div className="px-4 py-2 flex items-center justify-center">
                    <motion.span initial={{ rotate: 0 }} animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }} className="mr-2">
                        💳
                    </motion.span>
                    <span className="font-medium">결제하기</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

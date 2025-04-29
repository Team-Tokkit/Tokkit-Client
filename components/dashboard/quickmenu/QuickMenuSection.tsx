"use client"

import { motion } from "framer-motion";
import VoucherShortcutList from "@/components/dashboard/VoucherShortCutCardList";

export default function QuickMenuSection() {
    return (
        <motion.div className="mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <h3 className="text-md font-medium text-[#1A1A1A] mb-3 px-2">빠른 메뉴</h3>
            <VoucherShortcutList />
        </motion.div>
    );
}

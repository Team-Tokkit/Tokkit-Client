"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search } from "lucide-react" // lucide-react 아이콘 추가


export function VoucherSearch() {
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
        >
            <Card className="border-none shadow-sm bg-white">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-[#F3EEFF] flex items-center justify-center mr-4 overflow-hidden">
                            <Search size={20} className="text-[#7950F2]" />

                        </div>
                        <div>
                            <p className="text-base font-medium text-[#1A1A1A]">바우처 조회</p>
                            <p className="text-xs text-[#666666]">가맹점과 연관된 바우처를 확인할 수 있어요</p>
                        </div>
                    </div>
                    <Button
                        className="bg-[#7950F2] hover:bg-[#6741D9] text-white px-3 py-2 text-sm h-10 min-w-0"
                        onClick={() => router.push("/merchant/vouchers")}
                    >
                        바우처 목록
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}

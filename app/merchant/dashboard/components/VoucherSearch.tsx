"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

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
                            <Image src="/search-icon.png" alt="바우처 조회" width={30} height={30} className="object-cover" />
                        </div>
                        <div>
                            <p className="text-base font-medium text-[#1A1A1A]">바우처 조회</p>
                            <p className="text-xs text-[#666666]">가맹점과 연관된 바우처를 확인할 수 있어요</p>
                        </div>
                    </div>
                    <Button
                        className="bg-[#7950F2] hover:bg-[#6741D9] text-white"
                        onClick={() => router.push("/merchant/vouchers")}
                    >
                        바우처 목록
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}

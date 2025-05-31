"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"


export function VoucherSearch() {
    const router = useRouter()

    return (
        <div>
            <div className="flex items-center mb-3">
                <div className="w-1 h-5 bg-[#7950F2] rounded-full mr-2"></div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">바우처 조회</h2>
            </div>

            <div>
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-[#F3EEFF] flex items-center justify-center mr-4 overflow-hidden">
                                <Image src="/search-icon.png" alt="바우처 조회" width={24} height={24} className="object-cover" />
                            </div>
                            <div>
                                <p className="text-base font-medium text-[#1A1A1A]">바우처 조회</p>
                                <p className="text-xs text-[#666666]">가맹점과 연관된 바우처 확인</p>
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
            </div>
        </div>
    )
}

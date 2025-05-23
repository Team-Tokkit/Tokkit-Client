"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

interface SalesStatisticsProps {
    dailyIncome: number
    isLoading: boolean
}

export function SalesStatistics({ dailyIncome, isLoading }: SalesStatisticsProps) {
    return (
        <div>
            <div className="flex items-center mb-3">
                <div className="w-1 h-5 bg-[#4C6EF5] rounded-full mr-2"></div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">매출 통계</h2>
            </div>

            <div>
                {[
                    { label: "오늘 매출", value: dailyIncome, delay: 0.1, bg: "#EEF2FF", icon: "/images/merchant-bunny.png" },
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: item.delay }}
                    >
                        <Card className="border-none shadow-sm bg-white">
                            <CardContent className="p-4 flex items-center gap-4">
                                {/* 아이콘 */}
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: item.bg }}
                                >
                                    <Image src={item.icon} alt={item.label} width={30} height={30} className="object-cover" />
                                </div>

                                {/* 텍스트 */}
                                <div className="flex flex-col justify-center">
                                    <p className="text-sm text-[#666666] mb-1">{item.label}</p>
                                    <p className="text-xl font-bold text-[#1A1A1A]">
                                        {isLoading ? "-" : item.value.toLocaleString()} TKT
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                    </motion.div>
                ))}
            </div>
        </div>
    )
}

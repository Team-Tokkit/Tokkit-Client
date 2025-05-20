"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

interface SalesStatisticsProps {
    todayTotal: number
    weeklyTotal: number
    monthlyTotal: number
    isLoading: boolean
}

export function SalesStatistics({ todayTotal, weeklyTotal, monthlyTotal, isLoading }: SalesStatisticsProps) {
    return (
        <div>
            <div className="flex items-center mb-3">
                <div className="w-1 h-5 bg-[#4C6EF5] rounded-full mr-2"></div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">매출 통계</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "오늘 매출", value: todayTotal, delay: 0.1, bg: "#EEF2FF", icon: "/placeholder.svg?key=uj9er" },
                    { label: "이번 주 매출", value: weeklyTotal, delay: 0.2, bg: "#E6F8EF", icon: "/simple-bar-chart.png" },
                    { label: "이번 달 매출", value: monthlyTotal, delay: 0.3, bg: "#FFF9DB", icon: "/simple-monthly-calendar.png" },
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: item.delay }}
                    >
                        <Card className="border-none shadow-sm bg-white h-full">
                            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2`} style={{ backgroundColor: item.bg }}>
                                    <Image src={item.icon} alt={item.label} width={30} height={30} className="object-cover" />
                                </div>
                                <p className="text-sm text-[#666666] mb-1">{item.label}</p>
                                <p className="text-xl font-bold text-[#1A1A1A]">{isLoading ? "-" : item.value.toLocaleString()}원</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

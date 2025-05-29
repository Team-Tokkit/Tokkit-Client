"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cardDetailMap } from "@/app/landing-page/components/CardDetailMap"

interface TokenInfoCardProps {
    cardKey: string
    title: string
    description: string
    color: string
    icon: string
}

export default function TokenInfoCard({
                                          cardKey,
                                          title,
                                          description,
                                          color,
                                          icon,
                                      }: TokenInfoCardProps) {
    const detail = cardDetailMap[cardKey]

    return (
        <motion.div
            className="w-[85vw] max-w-[260px] bg-white  rounded-2xl overflow-hidden shadow-lg h-[350px]"
            whileHover={{ y: -5 }}
        >
            {/* 상단 색 바 */}
            <div className="h-3" style={{ backgroundColor: color }} />

            <div className="p-6 flex flex-col h-[calc(380px-3px)]">
                {/* 제목 및 아이콘 */}
                <div className="flex items-center mb-4">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3"
                        style={{ backgroundColor: `${color}30` }}
                    >
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] ">{title}</h3>
                </div>

                {/* 설명 텍스트 */}
                <p className="text-[#666666]  text-sm leading-relaxed mb-6 flex-grow">
                    {description}
                </p>

                {/* 외부 detail 컴포넌트 삽입 */}
                {detail && (
                    <div className="mb-10 h-[100px]">
                        {detail}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

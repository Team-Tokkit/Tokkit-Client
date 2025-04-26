"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TokenInfoCardProps {
  title: string
  description: string
  color: string
  icon: string
}

export default function TokenInfoCard({ title, description, color, icon }: TokenInfoCardProps) {
  return (
    <motion.div
      className="w-full max-w-[300px] bg-white dark:bg-[#2A2A2A] rounded-2xl overflow-hidden shadow-lg h-[380px]"
      whileHover={{ y: -5 }}
    >
      <div className="h-3" style={{ backgroundColor: color }} />
      <div className="p-6 flex flex-col h-[calc(380px-3px)]">
        <div className="flex items-center mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3"
            style={{ backgroundColor: `${color}30` }}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{title}</h3>
        </div>

        <p className="text-[#666666] dark:text-[#BBBBBB] text-sm leading-relaxed mb-6 flex-grow">{description}</p>

        {title === "CBDC란?" && (
          <div className="bg-[#F5F5F5] dark:bg-[#333333] p-4 rounded-xl mb-6 h-[100px] flex items-center">
            <div className="flex items-center">
              <div className="relative w-16 h-16">
                <img src="/images/bunny-mascot.png" alt="Tokkit 마스코트" className="w-full h-full object-contain" />
              </div>
              <div className="ml-3">
                <h4 className="font-bold text-sm text-[#1A1A1A] dark:text-white mb-1">Tokkit 토큰</h4>
                <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">안전하고 빠른 디지털 화폐의 시작</p>
              </div>
            </div>
          </div>
        )}

        {title === "안전한 거래" && (
          <div className="bg-[#F5F5F5] dark:bg-[#333333] p-4 rounded-xl mb-6 h-[100px] flex flex-col justify-center">
            <div className="relative">
              <div className="w-full h-12 flex items-center justify-center">
                <div className="w-full h-10 bg-[url('/barcode.svg')] bg-contain bg-no-repeat bg-center"></div>
              </div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-500 -translate-y-1/2"></div>
            </div>
            <div className="text-center mt-2 text-xs text-[#666666] dark:text-[#BBBBBB]">바코드 결제</div>
          </div>
        )}

        {(title === "빠른 송금" || title === "금융 포용성") && (
          <div className="bg-[#F5F5F5] dark:bg-[#333333] p-4 rounded-xl mb-6 h-[100px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2">{icon}</div>
              <p className="text-sm text-[#666666] dark:text-[#BBBBBB]">
                {title === "빠른 송금" ? "24시간 365일 실시간 송금" : "모두를 위한 금융 서비스"}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-auto">
          <Button variant="ghost" className="text-xs font-medium hover:bg-transparent p-0" style={{ color }}>
            자세히 알아보기
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

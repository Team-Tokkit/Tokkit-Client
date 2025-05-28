"use client"

import { motion } from "framer-motion"

interface Props {
    paymentCode: string
}

export default function PaymentGuideSection({ paymentCode }: Props) {
    return (
        <motion.div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 flex-shrink-0 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <h4 className="font-semibold text-blue-800 mb-2 text-center text-sm">💡 결제 방법 안내</h4>
            <div className="space-y-2">
                <GuideItem step="1" title="QR코드 스캔" description="토킷 앱으로 위 QR코드를 스캔하세요" />
                <GuideItem
                    step="2"
                    title="결제 코드 입력"
                    description={`QR 인식이 어려울 경우 ${paymentCode} 코드를 입력하세요`}
                />
            </div>
        </motion.div>
    )
}

function GuideItem({ step, title, description }: { step: string; title: string; description: string }) {
    return (
        <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="flex items-center space-x-2">
                <div className={`w-5 h-5 ${step === "1" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xs font-bold">{step}</span>
                </div>
                <div>
                    <h5 className="font-medium text-gray-800 text-xs">{title}</h5>
                    <p className="text-xs text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    )
}

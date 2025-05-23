"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Building, User, Info, Mail, Phone, MapPin, List, Store} from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const CATEGORY_LABELS: Record<string, string> = {
    FOOD: "음식점",
    MEDICAL: "의료",
    SERVICE: "서비스",
    TOURISM: "관광",
    LODGING: "숙박",
    EDUCATION: "교육",
}

interface Props {
    merchant: {
        storeName: string
        name: string
        businessNumber: string
        email: string
        phoneNumber: string
        roadAddress: string
        storeCategory: string
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
}

export default function MerchantInfoCard({ merchant }: Props) {

    const InfoItem = ({
                          icon: Icon,
                          label,
                          value,
                          badge,
                      }: {
        icon: any
        label: string
        value?: string
        badge?: string
    }) => (
        <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Icon className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
                <p className="text-base font-semibold text-gray-900 break-words">{value}</p>
                {badge && (
                    <Badge variant="secondary" className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                        {badge}
                    </Badge>
                )}
            </div>
        </div>
    )

    return (
        <Card className="shadow-md border-0 overflow-hidden mx-auto w-full max-w-md">
            <CardHeader className="bg-yellow-50 pb-4 rounded-t-xl">
                <CardTitle className="flex items-center text-lg">
                    <User className="mr-2 h-5 w-5 text-amber-500" />
                    안녕하세요 {merchant.storeName}님!⚡
                </CardTitle>
                <p className="text-sm text-gray-700 mt-1">가맹점 정보를 확인하세요!</p>
            </CardHeader>
            <motion.div variants={itemVariants}>
                    <CardContent className="p-6 space-y-4 bg-white">
                        <InfoItem icon={Building} label="가맹점명" value={merchant.storeName} />
                        <InfoItem icon={User} label="대표자명" value={merchant.name} />
                        <InfoItem icon={Info} label="사업자등록번호" value={merchant.businessNumber} />
                        <InfoItem icon={Mail} label="이메일" value={merchant.email} />
                        <InfoItem icon={Phone} label="전화번호" value={merchant.phoneNumber} />
                        <InfoItem icon={MapPin} label="주소" value={merchant.roadAddress} />
                        <InfoItem icon={Store} label="상점 카테고리" badge={CATEGORY_LABELS[merchant.storeCategory]}/>
                    </CardContent>
            </motion.div>
        </Card>
    )
}
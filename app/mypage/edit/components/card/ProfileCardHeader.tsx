"use client"

import { CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

interface ProfileCardHeaderProps {
    name: string
}

export default function ProfileCardHeader({ name }: ProfileCardHeaderProps) {
    return (
        <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 pb-6">
            <CardTitle className="text-xl font-semibold leading-snug">
                <div className="flex items-center mb-1">
                    <User className="mr-2 h-5 w-5 text-amber-600" />
                    안녕하세요 {name}님!⚡️
                </div>
                <span className="text-sm text-gray-600">
                    회원 정보를 확인하고 필요한 내용을 수정해주세요.
                </span>
            </CardTitle>
        </CardHeader>
    )
}

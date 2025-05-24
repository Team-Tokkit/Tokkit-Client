import { CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function ChangePasswordCardHeader() {
    return (
        <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 pb-6">
            <CardTitle className="flex flex-col items-start text-lg">
                <div className="flex items-center mb-1">
                    <Lock className="mr-2 h-5 w-5 text-amber-600" />
                    <span className="font-semibold">비밀번호는 주기적으로 변경하는 것이 좋아요</span>
                </div>
                <p className="text-sm text-gray-700 ml-7">
                    더 안전한 서비스 이용을 위해 지금 바꿔보세요
                </p>
            </CardTitle>
        </CardHeader>
    )
}
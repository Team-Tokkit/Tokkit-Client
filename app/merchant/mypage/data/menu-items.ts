import { CreditCard, Bell, FileText, Store, BarChart3, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export const useMenuItems = () => {
    const router = useRouter()

    return [
        {
            title: "가맹점 정보",
            icon: Store,
            action: () => router.push("/merchant/info"),
            color: "from-[#4F6EF7]/10 to-[#3A5BD9]/10",
            iconColor: "text-[#4F6EF7]",
        },
        {
            title: "비밀번호 변경",
            icon: BarChart3,
            action: () => router.push("/merchant/restet-password"),
            color: "from-[#10B981]/10 to-[#059669]/10",
            iconColor: "text-[#10B981]",
        },
        {
            title: "간편 비밀번호 변경",
            icon: Lock,
            action: () => router.push("/merchant/reset-pin"),
            color: "from-[#F43F5E]/10 to-[#D1365A]/10",
            iconColor: "text-[#F43F5E]",
        },
        {
            title: "결제 내역",
            icon: CreditCard,
            action: () => router.push("/merchant/wallet/totaltransaction"),
            color: "from-[#8B5CF6]/10 to-[#7C3AED]/10",
            iconColor: "text-[#8B5CF6]",
        },
        {
            title: "알림 설정",
            icon: Bell,
            action: () => router.push("/merchant/notifications/settings"),
            color: "from-[#EC4899]/10 to-[#BE185D]/10",
            iconColor: "text-[#EC4899]",
        },
        {
            title: "공지사항",
            icon: FileText,
            action: () => router.push("/merchant/notice"),
            color: "from-[#3B82F6]/10 to-[#2563EB]/10",
            iconColor: "text-[#3B82F6]",
        },
    ]
}

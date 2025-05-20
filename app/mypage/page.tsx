"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet, Ticket, CreditCard, Bell, FileText } from "lucide-react"
import MyPageHeader from "./components/MypageHeader"
import MenuList from "./components/MenuList"
import LogoutDialog from "./components/LogoutDialog"
import { getUserInfo, UserInfo } from "@/app/mypage/api/user-info";
import { getCookie } from "@/lib/cookies";

export default function MyPage() {
    const router = useRouter()

    const [user, setUser] = useState<UserInfo | null>(null)

    useEffect(() => {
        const token = getCookie("accessToken")
        if (!token) return

        getUserInfo(token)
            .then((data) => setUser(data))
            .catch((err) => {
                console.error("유저 정보 요청 실패:", err)
            })
    }, [])

    const menuItems = [
        {
            title: "전자지갑",
            icon: Wallet,
            action: () => router.push("/wallet"),
            color: "from-[#FFB020]/10 to-[#FF9500]/10",
            iconColor: "text-[#FF9500]",
        },
        {
            title: "내 바우처",
            icon: Ticket,
            action: () => router.push("/my-vouchers"),
            color: "from-[#10B981]/10 to-[#059669]/10",
            iconColor: "text-[#10B981]",
        },
        {
            title: "간편 비밀번호 변경",
            icon: CreditCard,
            action: () => router.push("/mypage/change-pin"),
            color: "from-[#F43F5E]/10 to-[#D1365A]/10",
            iconColor: "text-[#F43F5E]",
        },
        {
            title: "알림 설정",
            icon: Bell,
            action: () => router.push("/notifications/settings"),
            color: "from-[#8B5CF6]/10 to-[#7C3AED]/10",
            iconColor: "text-[#8B5CF6]",
        },
        {
            title: "공지사항",
            icon: FileText,
            action: () => router.push("/notice"),
            color: "from-[#EC4899]/10 to-[#BE185D]/10",
            iconColor: "text-[#EC4899]",
        },
    ]

    return (
        <div className="h-screen bg-[#F9FAFB] flex flex-col max-w-md mx-auto">
            <MyPageHeader user={user || { name: '', email: '', phoneNumber: '' }} />
            <main className="flex-1 flex flex-col p-5 px-6 pt-4 ">
                <MenuList menuItems={menuItems} />
                <LogoutDialog />
            </main>
        </div>
    )
}
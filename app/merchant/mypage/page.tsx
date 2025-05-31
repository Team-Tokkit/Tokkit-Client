"use client"

import {useEffect, useState} from "react"
import { useRouter } from "next/navigation"
import MerchantMypageHeader from "@/app/merchant/mypage/components/MerchantMypageHeader";
import ProfileCard, { ProfileCardSkeleton } from "@/app/merchant/mypage/components/ProfileCard";
import MenuList from "@/app/merchant/mypage/components/MenuList";
import LogoutButton from "@/app/merchant/mypage/components/LogoutButton";
import {getMerchantInfo} from "@/app/merchant/mypage/api/merchant-info";

export default function MerchantMyPage() {
    const router = useRouter()
    const [merchant, setMerchant] = useState({
        name: "",
        storeName: "",
        email: "",
        phoneNumber: "",
        businessNumber: "",
        roadAddress: "",
        category: "",
    })

    useEffect(() => {
        getMerchantInfo()
            .then((data) => {
                setMerchant(data)
            })
            .catch((err) => {
                console.error("가맹점주 정보 불러오기 실패:", err)
            })
    }, [])

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col max-w-md mx-auto">
            {/* 헤더 */}
            <header className="bg-[#F9FAFB] p-5 pt-8 pb-6">
                {/* 로고 및 상단 네비게이션 */}
                <MerchantMypageHeader />

                {/* 프로필 카드 */}
                {merchant.storeName ? (
                    <ProfileCard merchant={merchant} />
                ) : (
                    <ProfileCardSkeleton />
                )}
            </header>

            {/* 메인 컨텐츠 */}
            <div className="flex-1 flex flex-col p-5 px-6 pt-4 pb-24">
                {/* 전체 메뉴 */}
                <MenuList />

                {/* 로그아웃 버튼 */}
                <div className="mt-4 text-center">
                    <LogoutButton />
                </div> 
            </div>
        </div>
    )
}

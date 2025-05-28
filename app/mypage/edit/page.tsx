"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileHeader from "@/app/mypage/edit/components/header/ProfileHeader";
import ProfileCard from "@/app/mypage/edit/components/card/ProfileCard";
import ProfileCardHeader from "@/app/mypage/edit/components/card/ProfileCardHeader";
import SuccessNotice from "@/app/mypage/edit/components/SuccessNotice";
import ProfileForm from "@/app/mypage/edit/components/card/ProfileForm";
import {getCookie} from "@/lib/cookies";
import {getUserInfo} from "@/app/mypage/api/user-info";
import {updateUserInfo} from "@/app/mypage/edit/api/update-user-info";


export default function ProfileEditPage() {
    const router = useRouter()

    // 상태 정의
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    })

    const [isSaveSuccess, setIsSaveSuccess] = useState(false)

    useEffect(() => {
        const token = getCookie("accessToken")
        if (!token) return

        getUserInfo(token)
            .then((data) => {
                setUser(data)
            })
            .catch((err) => {
                console.error("유저 정보 불러오기 실패:", err)
            })
    }, [])


    // 이벤트 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await updateUserInfo({
                name: user.name,
                phoneNumber: user.phoneNumber,
            });

            setIsSaveSuccess(true)
            setTimeout(() => router.push("/mypage"), 1500)
        } catch (error) {
            console.error("프로필 저장 실패:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-md mx-auto">
                <ProfileHeader />
                <div className="mt-10">
                <ProfileCard>
                    <ProfileCardHeader name={user.name} />
                    {isSaveSuccess ? (
                        <SuccessNotice />
                    ) : (
                        <ProfileForm
                            user={user}
                            isSubmitting={isSubmitting}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancel={() => router.back()}
                        />
                    )}
                </ProfileCard>
                </div>
            </div>
        </div>
    )
}

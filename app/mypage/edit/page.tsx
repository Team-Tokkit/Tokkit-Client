"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import ProfileHeader from "@/app/mypage/edit/components/header/ProfileHeader";
import ProfileCard from "@/app/mypage/edit/components/card/ProfileCard";
import ProfileCardHeader from "@/app/mypage/edit/components/card/ProfileCardHeader";
import SuccessNotice from "@/app/mypage/edit/components/SuccessNotice";
import ProfileForm from "@/app/mypage/edit/components/card/ProfileForm";


export default function ProfileEditPage() {
    const router = useRouter()

    // 상태 정의
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [user, setUser] = useState({
        name: "홍길동",
        email: "user@example.com",
        phone: "010-1234-5678",
    })

    const [newEmail, setNewEmail] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [isVerificationSent, setIsVerificationSent] = useState(false)
    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
    const [isSaveSuccess, setIsSaveSuccess] = useState(false)

    // 이벤트 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            console.log("Submitting profile:", user)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsSaveSuccess(true)
            setTimeout(() => {
                router.push("/mypage")
            }, 1500)
        } catch (error) {
            console.error("Error updating profile:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSendVerification = async () => {
        console.log("Sending verification to:", newEmail)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsVerificationSent(true)
    }

    const handleVerifyEmail = async () => {
        console.log("Verifying code:", verificationCode)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setUser((prev) => ({ ...prev, email: newEmail }))
        setIsEmailDialogOpen(false)
        setNewEmail("")
        setVerificationCode("")
        setIsVerificationSent(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-md mx-auto">
                <ProfileHeader />
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
                            emailDialogProps={{
                                isOpen: isEmailDialogOpen,
                                setIsOpen: setIsEmailDialogOpen,
                                newEmail,
                                setNewEmail,
                                verificationCode,
                                setVerificationCode,
                                isVerificationSent,
                                handleSendVerification,
                                handleVerifyEmail,
                            }}
                        />
                    )}
                </ProfileCard>
            </div>
        </div>
    )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BackButton } from "@/components/back-button"
import { PageHeader } from "@/components/page-header"

export default function ProfileEditPage() {
    const router = useRouter()
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // In a real app, send to API
            console.log("Submitting profile:", user)

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            router.push("/mypage")
        } catch (error) {
            console.error("Error updating profile:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSendVerification = async () => {
        // In a real app, send verification code to the new email
        console.log("Sending verification to:", newEmail)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsVerificationSent(true)
    }

    const handleVerifyEmail = async () => {
        // In a real app, verify the code
        console.log("Verifying code:", verificationCode)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Update the email
        setUser((prev) => ({ ...prev, email: newEmail }))

        // Close the dialog and reset states
        setIsEmailDialogOpen(false)
        setNewEmail("")
        setVerificationCode("")
        setIsVerificationSent(false)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center">
                        <BackButton />
                        <PageHeader title="프로필 수정" />
                    </div>
                </div>
            </div>

            {/* 컨텐츠 */}
            <div className="container mx-auto px-4 py-6 max-w-md">
                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">이름</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        className="border-gray-300 focus:border-[#FFB020] focus:ring-[#FFB020]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">이메일</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="bg-gray-50 border-gray-300"
                                        />
                                        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100">
                                                    변경
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="w-[90%] max-w-[400px] rounded-lg p-0 overflow-hidden">
                                                <DialogHeader className="px-4 py-3 bg-gray-50 border-b">
                                                    <DialogTitle className="text-base">이메일 변경</DialogTitle>
                                                    <DialogDescription className="text-xs">
                                                        새 이메일 주소를 입력하고 인증 코드를 확인하세요.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="p-4 space-y-3">
                                                    <div className="space-y-1.5">
                                                        <Label htmlFor="newEmail" className="text-sm">
                                                            새 이메일
                                                        </Label>
                                                        <Input
                                                            id="newEmail"
                                                            value={newEmail}
                                                            onChange={(e) => setNewEmail(e.target.value)}
                                                            placeholder="새 이메일 주소"
                                                            className="border-gray-300 focus:border-[#FFB020] focus:ring-[#FFB020] text-sm h-9"
                                                        />
                                                    </div>

                                                    {!isVerificationSent ? (
                                                        <Button
                                                            onClick={handleSendVerification}
                                                            disabled={!newEmail || newEmail === user.email}
                                                            className="w-full bg-[#FFB020] hover:bg-[#FF9500] text-white text-sm h-9 mt-2"
                                                        >
                                                            인증 코드 발송
                                                        </Button>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            <Alert className="bg-blue-50 border-blue-200 py-2 px-3">
                                                                <Info className="h-3.5 w-3.5 text-blue-500" />
                                                                <AlertDescription className="text-blue-700 text-xs ml-2">
                                                                    인증 코드가 {newEmail}로 발송되었습니다.
                                                                </AlertDescription>
                                                            </Alert>
                                                            <div className="space-y-1.5">
                                                                <Label htmlFor="verificationCode" className="text-sm">
                                                                    인증 코드
                                                                </Label>
                                                                <Input
                                                                    id="verificationCode"
                                                                    value={verificationCode}
                                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                                    placeholder="인증 코드 6자리"
                                                                    className="border-gray-300 focus:border-[#FFB020] focus:ring-[#FFB020] text-sm h-9"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <DialogFooter className="p-3 bg-gray-50 border-t flex justify-end space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setIsEmailDialogOpen(false)}
                                                        className="border-gray-300 hover:bg-gray-100 text-sm h-8 px-3"
                                                    >
                                                        취소
                                                    </Button>
                                                    <Button
                                                        onClick={handleVerifyEmail}
                                                        disabled={!isVerificationSent || !verificationCode}
                                                        className="bg-[#FFB020] hover:bg-[#FF9500] text-white text-sm h-8 px-3"
                                                    >
                                                        확인
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">이메일 변경 시 인증 과정이 필요합니다.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">전화번호</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={user.phone}
                                        onChange={handleChange}
                                        className="border-gray-300 focus:border-[#FFB020] focus:ring-[#FFB020]"
                                    />
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-end space-x-4 pt-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => router.back()}
                                    className="border-gray-300 hover:bg-gray-100"
                                >
                                    취소
                                </Button>
                                <Button type="submit" disabled={isSubmitting} className="bg-[#FFB020] hover:bg-[#FF9500] text-white">
                                    {isSubmitting ? "저장 중..." : "저장"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

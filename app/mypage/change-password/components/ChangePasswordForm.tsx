"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import PasswordInput from "./PasswordInput"
import { Button } from "@/components/ui/button"
import ChangePasswordCardHeader from "@/app/mypage/change-password/components/ChangePasswordCardHeader";
import {updatePassword} from "@/app/mypage/change-password/api/password-update";

export default function ChangePasswordForm({ onSuccess }: { onSuccess: () => void }) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        let isValid = true
        const newErrors = { ...errors }

        if (!formData.currentPassword) {
            newErrors.currentPassword = "현재 비밀번호를 입력해주세요."
            isValid = false
        }
        if (!formData.newPassword) {
            newErrors.newPassword = "새 비밀번호를 입력해주세요."
            isValid = false
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = "비밀번호는 8자 이상이어야 합니다."
            isValid = false
        } else if (formData.newPassword === formData.currentPassword) {
            newErrors.newPassword = "현재 비밀번호와 다른 비밀번호를 입력해주세요."
            isValid = false
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "비밀번호 확인을 입력해주세요."
            isValid = false
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // 실제 API 호출
            await updatePassword(formData.currentPassword, formData.newPassword);

            toast({
                title: "비밀번호 변경 완료",
                description: "비밀번호가 성공적으로 변경되었습니다.",
            });

            onSuccess();
        } catch (error) {
            console.error(error);
            toast({
                title: "오류 발생",
                description: "비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Card className="items-center justify-center shadow-lg border-0 overflow-hidden ">
            <ChangePasswordCardHeader />
            <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                    <Image src="/images/bunny-lock.png" alt="보안 마스코트" width={120} height={120} className="h-28 w-28" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <PasswordInput id="currentPassword" label="현재 비밀번호" name="currentPassword" value={formData.currentPassword} onChange={handleChange} error={errors.currentPassword} placeholder="현재 비밀번호를 입력하세요" />
                    <PasswordInput id="newPassword" label="새 비밀번호" name="newPassword" value={formData.newPassword} onChange={handleChange} error={errors.newPassword} placeholder="새 비밀번호를 입력하세요" />
                    <PasswordInput id="confirmPassword" label="비밀번호 확인" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="새 비밀번호를 다시 입력하세요" />
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg font-medium transition-all">
                        {isSubmitting ? "처리 중..." : "비밀번호 변경하기"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

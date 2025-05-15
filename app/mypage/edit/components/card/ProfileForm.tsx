"use client"

import { Mail, Phone, User, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import EmailChangeDialog from "./EmailChangeDialog"
import { motion } from "framer-motion"

interface ProfileFormProps {
    user: {
        name: string
        email: string
        phoneNumber: string
    }
    isSubmitting: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (e: React.FormEvent) => void
    onCancel: () => void
    emailDialogProps: {
        isOpen: boolean
        setIsOpen: (open: boolean) => void
        newEmail: string
        setNewEmail: (value: string) => void
        verificationCode: string
        setVerificationCode: (value: string) => void
        isVerificationSent: boolean
        handleSendVerification: () => void
        handleVerifyEmail: () => void
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

function formatPhoneNumber(value: string): string {
    const onlyNums = value.replace(/\D/g, "").slice(0, 11); // 최대 11자리 제한

    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7)}`;
}

export default function ProfileForm({
                                        user,
                                        isSubmitting,
                                        onChange,
                                        onSubmit,
                                        onCancel,
                                        emailDialogProps,
                                    }: ProfileFormProps) {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        const syntheticEvent = {
            ...e,
            target: {
                ...e.target,
                name: "phoneNumber",
                value: formatted,
            },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 p-6">
        {/* 이름 */}
            <motion.div variants={itemVariants} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center text-sm font-medium">
                        <User className="mr-2 h-4 w-4 text-gray-500" />
                        이름
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={onChange}
                        className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all"
                    />
                </div>
            </motion.div>

            {/* 이메일 */}
            <motion.div variants={itemVariants} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center text-sm font-medium">
                        <Mail className="mr-2 h-4 w-4 text-gray-500" />
                        이메일
                    </Label>
                    <div className="flex gap-2 items-center">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            disabled
                            className="bg-gray-100 border-gray-200 text-gray-500"
                        />
                        <EmailChangeDialog {...emailDialogProps} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <Info className="h-3 w-3 mr-1" />
                        이메일 변경 시 인증 과정이 필요합니다.
                    </p>
                </div>
            </motion.div>

            {/* 전화번호 */}
            <motion.div variants={itemVariants} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="flex items-center text-sm font-medium">
                        <Phone className="mr-2 h-4 w-4 text-gray-500" />
                        전화번호
                    </Label>
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={user.phoneNumber}
                        onChange={handlePhoneChange}
                        className="border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all"
                    />
                </div>
            </motion.div>

            {/* 버튼 */}
            <motion.div
                variants={itemVariants}
                className="flex justify-end space-x-4 pt-6 border-t border-gray-100 mt-6"
            >
                <Button
                    variant="outline"
                    type="button"
                    onClick={onCancel}
                    className="border-gray-300 hover:bg-gray-100 transition-all"
                >
                    취소
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-500 hover:bg-amber-600 text-white transition-all"
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
              <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              저장 중...
            </span>
                    ) : (
                        "저장"
                    )}
                </Button>
            </motion.div>
        </form>
    )
}

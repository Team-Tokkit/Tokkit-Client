"use client"

import { Button } from "@/components/ui/button"

interface ResetPasswordCompleteProps {
    email: string
    onComplete: () => void
}

export default function ResetPasswordComplete({ email, onComplete }: ResetPasswordCompleteProps) {
    return (
        <div className="text-center">
            <img src="/images/bunny-complete.png" alt="Security Mascot" className="mx-auto mb-6 w-1/2" />

            <h2 className="text-xl font-bold mb-2 text-[#1A1A1A] ">비밀번호 초기화 완료</h2>
            <p className="text-[#666666]  mb-6">
                임시 비밀번호가 <span className="font-semibold">{email}</span>로 <br /> 발송되었습니다 📮
                <br />
                메일함을 확인해 주세요.
            </p>

            <div className="bg-gray-100  p-4 rounded-lg ">
                <p className="text-sm text-gray-600 ">
                    임시 비밀번호로 로그인 후 <br /> 보안을 위해 비밀번호를 변경해주세요.
                </p>
            </div>

            <Button
                className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white  font-medium rounded-xl shadow-md shadow-[#FFB020]/20 mt-6"
                onClick={onComplete}
            >
                로그인 화면으로 돌아가기
            </Button>
        </div>
    )
}

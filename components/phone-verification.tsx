"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhoneVerificationProps {
  onVerified: () => void
}

export default function PhoneVerification({ onVerified }: PhoneVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180) // 3분
  const [loading, setLoading] = useState(false)

  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return

    setLoading(true)
    // 실제로는 API 호출하여 인증번호 발송
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setIsCodeSent(true)

    // 타이머 시작
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) return

    setLoading(true)
    // 실제로는 API 호출하여 인증번호 검증
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)

    // 인증 성공 시 다음 단계로
    onVerified()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }

  return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[#444444]  text-sm font-medium">
            휴대폰 번호
          </Label>
          <div className="flex gap-2">
            <Input
                id="phone"
                value={formatPhoneNumber(phoneNumber)}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                placeholder="휴대폰 번호를 입력하세요"
                className="h-12 rounded-xl border-[#E0E0E0]  bg-white  focus-visible:ring-[#FFD485]  focus-visible:ring-offset-0"
                maxLength={13}
                disabled={isCodeSent && timeLeft > 0}
            />
            <Button
                onClick={handleSendCode}
                disabled={phoneNumber.length < 10 || (isCodeSent && timeLeft > 0) || loading}
                className="h-12 px-4 bg-[#FFB020] hover:bg-[#FF9500]   text-white  font-medium rounded-xl shadow-md shadow-[#FFB020]/20  whitespace-nowrap"
            >
              {isCodeSent && timeLeft > 0 ? "재전송" : "인증번호 받기"}
            </Button>
          </div>
        </div>

        {isCodeSent && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="code" className="text-[#444444]  text-sm font-medium">
                  인증번호
                </Label>
                <span className={`text-sm ${timeLeft > 60 ? "text-[#666666] " : "text-red-500"}`}>
              {formatTime(timeLeft)}
            </span>
              </div>
              <div className="flex gap-2">
                <Input
                    id="code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="인증번호 6자리를 입력하세요"
                    className="h-12 rounded-xl border-[#E0E0E0]  bg-white  focus-visible:ring-[#FFD485]  focus-visible:ring-offset-0"
                    maxLength={6}
                    disabled={timeLeft === 0 || loading}
                />
                <Button
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6 || timeLeft === 0 || loading}
                    className="h-12 px-4 bg-[#FFB020] hover:bg-[#FF9500]   text-white  font-medium rounded-xl shadow-md shadow-[#FFB020]/20 "
                >
                  {loading ? "확인 중..." : "확인"}
                </Button>
              </div>
              {timeLeft === 0 && (
                  <p className="text-xs text-red-500">인증 시간이 만료되었습니다. 인증번호를 다시 받아주세요.</p>
              )}
            </motion.div>
        )}
      </div>
  )
}

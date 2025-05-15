"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
    email: string
    setEmail: (email: string) => void
    verificationCode: string
    setVerificationCode: (code: string) => void
    onSendCode: () => void
    onSubmit: (e: React.FormEvent) => void
    sendingCode: boolean
    loading: boolean
    codeSent: boolean
    countdown: number
}

export default function StepVerify({
                                       email,
                                       setEmail,
                                       verificationCode,
                                       setVerificationCode,
                                       onSendCode,
                                       onSubmit,
                                       sendingCode,
                                       loading,
                                       codeSent,
                                       countdown,
                                   }: Props) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-xl font-bold text-center mb-6">본인 인증</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="가입한 이메일을 입력하세요"
                        required
                        disabled={loading || codeSent}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="code">인증 코드</Label>
                        <div className="flex items-center">
                            {countdown > 0 && (
                                <span className="text-xs text-red-500 mr-2">{formatTime(countdown)}</span>
                            )}
                            <Button
                                type="button"
                                variant="link"
                                size="sm"
                                className="text-xs"
                                onClick={onSendCode}
                                disabled={sendingCode || loading}
                            >
                                {sendingCode ? (
                                    <>
                                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                        전송 중...
                                    </>
                                ) : codeSent ? (
                                    "재전송"
                                ) : (
                                    "인증 코드 받기"
                                )}
                            </Button>
                        </div>
                    </div>
                    <Input
                        id="code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="인증 코드 6자리를 입력하세요"
                        required
                        disabled={loading || !codeSent}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A]"
                    disabled={loading || !codeSent}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            인증 중...
                        </>
                    ) : (
                        "다음"
                    )}
                </Button>
            </form>
        </motion.div>
    )
}

"use client"

import { useEffect, useState } from "react"
import ResetPinLayout from "./components/ResetPinLayout"
import StepVerify from "./components/StepVerify"
import StepNewPin from "./components/StepNewPin"
import StepConfirmPin from "./components/StepConfirmPin"
import StepComplete from "./components/StepComplete"
import { toast } from "@/hooks/use-toast"

export default function ResetPinPage() {
    const [step, setStep] = useState<"verify" | "new-pin" | "confirm-pin" | "complete">("verify")
    const [email, setEmail] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [newPin, setNewPin] = useState("")
    const [confirmPin, setConfirmPin] = useState("")
    const [loading, setLoading] = useState(false)
    const [sendingCode, setSendingCode] = useState(false)
    const [codeSent, setCodeSent] = useState(false)
    const [countdown, setCountdown] = useState(0)

    // 인증 코드 타이머
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    // 인증 코드 요청
    const handleSendCode = async () => {
        if (!email || !email.includes("@")) {
            toast({
                title: "이메일 오류",
                description: "올바른 이메일 주소를 입력해주세요.",
                variant: "destructive",
            })
            return
        }

        setSendingCode(true)
        try {
            await new Promise((res) => setTimeout(res, 1500)) // 실제 API 대체
            setCodeSent(true)
            setCountdown(180)
            toast({
                title: "인증 코드 발송 완료",
                description: `${email}로 인증 코드가 발송되었습니다.`,
            })
        } catch {
            toast({
                title: "오류 발생",
                description: "인증 코드 발송에 실패했습니다.",
                variant: "destructive",
            })
        } finally {
            setSendingCode(false)
        }
    }

    // 이메일 인증 처리
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !verificationCode) {
            toast({
                title: "입력 오류",
                description: "이메일과 인증 코드를 모두 입력해주세요.",
                variant: "destructive",
            })
            return
        }

        if (!codeSent) {
            toast({
                title: "인증 코드 필요",
                description: "먼저 인증 코드를 요청해주세요.",
                variant: "destructive",
            })
            return
        }

        setLoading(true)
        try {
            await new Promise((res) => setTimeout(res, 1500)) // 실제 API 대체
            setStep("new-pin")
            toast({
                title: "인증 성공",
                description: "본인 인증이 완료되었습니다.",
            })
        } catch {
            toast({
                title: "인증 실패",
                description: "인증 코드가 올바르지 않습니다.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleNewPin = (pin: string) => {
        setNewPin(pin)
        toast({
            title: "PIN 입력 완료",
            description: "확인을 위해 한 번 더 입력해주세요.",
        })
        setStep("confirm-pin")
    }

    const handleConfirmPin = async (pin: string) => {
        setConfirmPin(pin)
        setLoading(true)

        try {
            if (pin === newPin) {
                await new Promise((res) => setTimeout(res, 1500)) // 실제 API 대체
                setStep("complete")
                toast({
                    title: "변경 완료",
                    description: "간편 비밀번호가 성공적으로 변경되었습니다.",
                })
            } else {
                toast({
                    title: "PIN 불일치",
                    description: "입력한 PIN이 일치하지 않습니다.",
                    variant: "destructive",
                })
                setStep("new-pin")
            }
        } catch {
            toast({
                title: "오류 발생",
                description: "비밀번호 변경 중 오류가 발생했습니다.",
                variant: "destructive",
            })
            setStep("new-pin")
        } finally {
            setLoading(false)
        }
    }

    const handleComplete = () => {
        window.location.href = "/login"
    }

    return (
        <ResetPinLayout>
            {step === "verify" && (
                <StepVerify
                    email={email}
                    setEmail={setEmail}
                    verificationCode={verificationCode}
                    setVerificationCode={setVerificationCode}
                    onSendCode={handleSendCode}
                    onSubmit={handleVerify}
                    sendingCode={sendingCode}
                    loading={loading}
                    codeSent={codeSent}
                    countdown={countdown}
                />
            )}
            {step === "new-pin" && <StepNewPin onSubmit={handleNewPin} />}
            {step === "confirm-pin" && (
                <StepConfirmPin onSubmit={handleConfirmPin} loading={loading} />
            )}
            {step === "complete" && <StepComplete onDone={handleComplete} />}
        </ResetPinLayout>
    )
}

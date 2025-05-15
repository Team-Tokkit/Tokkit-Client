"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import ChangePinLayout from "./components/ChangePinLayout"
import StepVerifyCurrent from "./components/StepVerifyCurrent"
import StepNewPin from "./components/StepNewPin"
import StepConfirmPin from "./components/StepConfirmPin"
import StepComplete from "./components/StepComplete"

export default function ChangePinPage() {
    const router = useRouter()
    const [step, setStep] = useState<"verify-current" | "new-pin" | "confirm-pin" | "complete">("verify-current")
    const [currentPin, setCurrentPin] = useState("")
    const [newPin, setNewPin] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [attempts, setAttempts] = useState(0)

    // 현재 PIN 확인
    const handleVerifyCurrent = async (pin: string) => {
        setCurrentPin(pin)
        setLoading(true)
        setError("")

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)) // mock delay

            const isCorrect = pin === "123456" // mock correct pin

            if (isCorrect) {
                setStep("new-pin")
                toast({
                    title: "인증 성공",
                    description: "새로운 간편 비밀번호를 입력해주세요.",
                })
            } else {
                const newAttempts = attempts + 1
                setAttempts(newAttempts)

                if (newAttempts >= 3) {
                    setError("비밀번호 입력 횟수를 초과했습니다. 비밀번호 찾기를 이용해주세요.")
                } else {
                    setError(`비밀번호가 일치하지 않습니다. (${newAttempts}/3)`)
                }
            }
        } catch {
            setError("인증 중 오류가 발생했습니다. 다시 시도해주세요.")
        } finally {
            setLoading(false)
        }
    }

    // 새 PIN 입력
    const handleNewPin = (pin: string) => {
        if (pin === currentPin) {
            toast({
                title: "오류",
                description: "현재 비밀번호와 다른 비밀번호를 입력해주세요.",
                variant: "destructive",
            })
            return
        }

        setNewPin(pin)
        toast({
            title: "새 비밀번호 입력 완료",
            description: "비밀번호 확인을 위해 한번 더 입력해주세요.",
        })
        setStep("confirm-pin")
    }

    // 새 PIN 확인
    const handleConfirmPin = async (pin: string) => {
        setLoading(true)

        try {
            if (pin === newPin) {
                await new Promise((resolve) => setTimeout(resolve, 1500)) // mock delay
                setStep("complete")
                toast({
                    title: "비밀번호 변경 성공",
                    description: "간편 비밀번호가 성공적으로 변경되었습니다.",
                })
            } else {
                toast({
                    title: "비밀번호 불일치",
                    description: "입력한 비밀번호가 일치하지 않습니다. 다시 시도해주세요.",
                    variant: "destructive",
                })
                setStep("new-pin")
            }
        } catch {
            toast({
                title: "오류 발생",
                description: "비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.",
                variant: "destructive",
            })
            setStep("new-pin")
        } finally {
            setLoading(false)
        }
    }

    // 비밀번호 찾기
    const handleForgotPin = () => {
        router.push("/mypage/reset-pin")
    }

    // 완료 후 이동
    const handleComplete = () => {
        router.push("/mypage")
    }

    return (
        <ChangePinLayout>
            {step === "verify-current" && (
                <StepVerifyCurrent
                    onSubmit={handleVerifyCurrent}
                    onForgot={handleForgotPin}
                    error={error}
                    loading={loading}
                />
            )}

            {step === "new-pin" && <StepNewPin onSubmit={handleNewPin} />}

            {step === "confirm-pin" && (
                <StepConfirmPin onSubmit={handleConfirmPin} loading={loading} />
            )}

            {step === "complete" && <StepComplete onDone={handleComplete} />}
        </ChangePinLayout>
    )
}

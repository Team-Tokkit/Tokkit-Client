"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import ChangePinHeader from "./components/ChangePinHeader"
import StepIntro from "./components/StepIntro"
import StepVerifyCurrent from "./components/StepVerifyCurrent"
import StepNewPin from "./components/StepNewPin"
import StepConfirmPin from "./components/StepConfirmPin"
import StepComplete from "./components/StepComplete"
import { verifySimplePassword, updateSimplePassword } from "./api/verify-simple-password"
import { getCookie } from "@/lib/cookies"
import LoadingOverlay from "@/components/common/LoadingOverlay"

export default function ChangePinPage() {
    const router = useRouter()
    const [step, setStep] = useState<"verify-current" | "new-pin" | "confirm-pin" | "complete">("verify-current")
    const [currentPin, setCurrentPin] = useState("")
    const [newPin, setNewPin] = useState("")
    const [confirmPin, setConfirmPin] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [attempts, setAttempts] = useState(0)

    const handleVerifyCurrent = async (pin: string) => {
        setCurrentPin(pin)
        setLoading(true)
        setError("")

        try {
            const accessToken = getCookie("accessToken")
            if (!accessToken) throw new Error("로그인이 필요합니다.")

            await verifySimplePassword(accessToken, pin)

            setStep("new-pin")
            toast({
                title: "인증 성공",
                description: "새로운 간편 비밀번호를 입력해주세요.",
            })
        } catch (err: any) {
            const newAttempts = attempts + 1
            setAttempts(newAttempts)

            if (newAttempts >= 3) {
                setError("비밀번호 입력 횟수를 초과했습니다. 비밀번호 찾기를 이용해주세요.")
            } else {
                setError(err?.message || `비밀번호가 일치하지 않습니다. (${newAttempts}/3)`)
            }
        } finally {
            setLoading(false)
        }
    }

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

    const handleConfirmPin = async (pin: string) => {
        setConfirmPin(pin)
        setLoading(true)

        try {
            if (pin !== newPin) {
                toast({
                    title: "비밀번호 불일치",
                    description: "입력한 비밀번호가 일치하지 않습니다.",
                    variant: "destructive",
                })
                setStep("new-pin")
                return
            }

            const accessToken = getCookie("accessToken")
            if (!accessToken) throw new Error("로그인이 필요합니다.")

            await updateSimplePassword(accessToken, pin)

            setStep("complete")
            toast({
                title: "비밀번호 변경 성공",
                description: "간편 비밀번호가 성공적으로 변경되었습니다.",
            })
        } catch (err: any) {
            toast({
                title: "오류 발생",
                description: err?.message || "비밀번호 변경 중 오류가 발생했습니다.",
                variant: "destructive",
            })
            setStep("new-pin")
        } finally {
            setLoading(false)
        }
    }

    const handleForgotPin = () => router.push("/mypage/reset-pin")
    const handleComplete = () => router.push("/mypage")

    const stepContent = {
        "verify-current": {
            title: "현재 비밀번호 확인",
            subtitle: "현재 사용 중인 6자리 비밀번호를 입력해주세요",
        },
        "new-pin": {
            title: "새 비밀번호 입력",
            subtitle: "새로운 6자리 비밀번호를 입력해주세요",
        },
        "confirm-pin": {
            title: "비밀번호 확인",
            subtitle: "새 비밀번호를 다시 한번 입력해주세요",
        },
    }

    const pageVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col max-w-md mx-auto">
            <ChangePinHeader />

    <div className="flex-1 flex flex-col items-center justify-start p-6 pt-0">
      {step !== "complete" && (
        <StepIntro
          title={stepContent[step]?.title}
          subtitle={stepContent[step]?.subtitle}
        />
      )}

      <div className="w-full max-w-xs">
        <motion.div
          key={step}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
        >
          {step === "verify-current" && (
            <StepVerifyCurrent
              onSubmit={handleVerifyCurrent}
              onForgot={handleForgotPin}
              loading={loading} // 여전히 전달됨
              error={error}
              failCount={attempts}
            />
          )}
          {step === "new-pin" && <StepNewPin onSubmit={handleNewPin} />}
          {step === "confirm-pin" && (
            <StepConfirmPin onSubmit={handleConfirmPin} loading={loading} />
          )}
          {step === "complete" && <StepComplete onDone={handleComplete} />}
        </motion.div>
      </div>
    </div>

    {loading && <LoadingOverlay message="비밀번호 확인중입니다." />}
  </div>
)
}
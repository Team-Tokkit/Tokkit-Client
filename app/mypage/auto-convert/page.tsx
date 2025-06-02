"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import AutoConvertForm from "./components/AutoConvertForm"
import AutoConvertCompleteStep from "./components/AutoConvertCompleteStep"
import LoadingOverlay from "@/components/common/LoadingOverlay"
import {updateAutoConvertSetting} from "@/app/mypage/auto-convert/api/fetch-auto-convert";

type Step = "form" | "complete"

interface AutoConvertSettingRequest {
    enabled: boolean
    dayOfMonth: number
    hour: number
    minute: number
    amount: number
}

export default function AutoConvertPage() {
    const router = useRouter()
    const [step, setStep] = useState<Step>("form")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [settings, setSettings] = useState<AutoConvertSettingRequest>({
        enabled: true,
        dayOfMonth: 1,
        hour: 9,
        minute: 0,
        amount: 100000,
    })

    const handleSave = async () => {
        setIsSubmitting(true)
        try {
            await updateAutoConvertSetting(settings)

            setStep("complete") // 완료 단계로 전환
        } catch (err) {
            alert("설정 저장에 실패했습니다.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#FFFCF5] flex flex-col">
            {/* 상단 헤더 */}
            <div className="px-4 py-4 flex items-center gap-3 bg-white border-b border-gray-100">
                <Button
                    variant="ghost"
                    size="sm"
                    className="p-1"
                    onClick={() => (step === "complete" ? setStep("form") : router.back())}
                >
                    <ArrowLeft className="h-5 w-5 text-gray-700" />
                </Button>
                <h1 className="text-lg font-semibold text-black">
                    {step === "form" ? "예금 자동 전환" : "설정 완료"}
                </h1>
            </div>

            {/* 본문 영역 */}
            <div className="px-4 py-4 flex-1">
                {step === "form" ? (
                    <AutoConvertForm
                        settings={settings}
                        onChange={setSettings}
                        onSubmit={handleSave}
                        isSubmitting={isSubmitting}
                    />
                ) : (
                    <AutoConvertCompleteStep
                        settings={settings}
                        onDone={() => router.push("/mypage")}
                    />
                )}
            </div>

            {/* 로딩 오버레이 */}
            {isSubmitting && <LoadingOverlay message="설정 저장 중입니다..." />}
        </div>
    )
}

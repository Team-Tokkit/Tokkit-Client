"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"
import VirtualKeypad from "@/components/virtual-keypad"

interface Props {
    onSubmit: (pin: string) => void
    onForgot: () => void
    error?: string
    loading: boolean
}

export default function StepVerifyCurrent({ onSubmit, onForgot, error, loading }: Props) {
    return (
        <div className="space-y-6">
            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-[#FFB020] dark:text-[#FFD485]" />
                    <p className="mt-4 text-[#666666] dark:text-[#BBBBBB]">인증 중...</p>
                </div>
            ) : (
                <>
                    <VirtualKeypad
                        onComplete={onSubmit}
                        title="현재 비밀번호 입력"
                        subtitle="현재 사용 중인 6자리 비밀번호를 입력해주세요"
                    />
                    <div className="text-center mt-8">
                        <Button
                            variant="link"
                            onClick={onForgot}
                            className="text-[#666666] dark:text-[#BBBBBB] hover:text-[#FFB020] dark:hover:text-[#FFD485]"
                        >
                            비밀번호를 잊으셨나요?
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

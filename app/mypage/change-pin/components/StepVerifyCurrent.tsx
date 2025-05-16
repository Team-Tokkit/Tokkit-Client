"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import VirtualKeypad from "@/components/virtual-keypad"

interface Props {
    onSubmit: (pin: string) => void
    onForgot: () => void
    loading: boolean
    error?: string
}

export default function StepVerifyCurrent({ onSubmit, onForgot, loading, error }: Props) {
    return (
        <div className="space-y-6">
            {error && (
                <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-12 w-12 animate-spin text-[#FFB020]" />
                    <p className="mt-4 text-[#666666]">인증 중...</p>
                </div>
            ) : (
                <>
                    <VirtualKeypad onComplete={onSubmit} hideTitle />
                    <div className="text-center mt-8">
                        <Button
                            variant="link"
                            onClick={onForgot}
                            className="text-[#666666] hover:text-[#FFB020]"
                        >
                            비밀번호를 잊으셨나요?
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

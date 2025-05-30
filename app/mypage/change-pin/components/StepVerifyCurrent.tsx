"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import VirtualKeypad from "@/components/virtual-keypad"

interface Props {
    onSubmit: (pin: string) => void
    onForgot: () => void
    loading: boolean
    error?: string
    failCount?: number
}

export default function StepVerifyCurrent({ onSubmit, onForgot, loading, error, failCount = 0 }: Props) {
  return (
    <div className="">
      {failCount > 0 && (
        <p className="text-xs text-red-500 font-semibold text-center mb-5">
          오류 {failCount}/5
        </p>
      )}

      {/* ✅ 항상 키패드 노출 */}
      <VirtualKeypad onComplete={onSubmit} hideTitle />

      <div className="text-center mt-8">
        <Button
          variant="link"
          onClick={onForgot}
          className="text-[#666666] hover:text-[#FFB020]"
          disabled={loading} // 입력 방지 (선택)
        >
          비밀번호를 잊으셨나요?
        </Button>
      </div>
    </div>
  )
}

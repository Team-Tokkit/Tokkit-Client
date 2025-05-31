"use client";

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import VirtualKeypad, { VirtualKeypadHandle } from "@/components/virtual-keypad"
import LoadingOverlay from "@/components/common/LoadingOverlay"

interface VirtualKeypadProps {
    onComplete: (pinCode: string) => Promise<void>;
    maxLength: number;
    disabled?: boolean;
}

interface Props {
    onVerified: (password: string) => void;
}

export default function VerifySimplePassword({ onVerified }: Props) {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [failCount, setFailCount] = useState(0)
    const keypadRef = useRef<VirtualKeypadHandle>(null)

    useEffect(() => {
        if (failCount >= 5) {
          alert("비밀번호 5회 실패로 비밀번호 변경창으로 이동합니다");
          router.push("/merchant/mypage/change-simple-password")
        }
      }, [failCount, router])
    
      const handleKeypadComplete = async (pinCode: string) => {
        setIsLoading(true)
        setError(null)
    
        try {
          setPassword(pinCode)
          await onVerified(pinCode)
        } catch (e) {
          keypadRef.current?.reset()
          const nextCount = failCount + 1
          setFailCount(nextCount)
          setError("비밀번호가 일치하지 않습니다. 다시 입력해주세요.")
        } finally {
          setIsLoading(false)
        }
      }
    
      const reset = () => {
        setPassword("")
        setError(null)
      }
    
      const handleForgotPassword = () => {
        alert("비밀번호 5회 실패로 비밀번호 변경창으로 이동합니다");
        router.push("/merchant/mypage/change-simple-password")
      }
    
      return (
        <div className="w-full max-w-xs mx-auto relative">
          <motion.div
            className="mb-5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">간편 비밀번호 입력</h2>
            <p className="text-sm text-[#666666]">
              서비스를 이용하기 위해 비밀번호를 입력해주세요.
            </p>
          </motion.div>
      
          {failCount > 0 && (
            <p className="text-xs text-red-500 font-semibold text-center mt-3 mb-5">
              오류 {failCount}/5
            </p>
          )}
      
          <VirtualKeypad
            ref={keypadRef}
            onComplete={handleKeypadComplete}
            maxLength={6}
            disabled={isLoading}
          />
      
          <p
            className="text-sm text-gray-500 text-center mt-8 mb-8 underline cursor-pointer hover:text-gray-700"
            onClick={handleForgotPassword}
          >
            비밀번호를 잊으셨나요?
          </p>
        </div>
      )
    }
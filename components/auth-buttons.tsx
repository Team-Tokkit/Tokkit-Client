"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface AuthButtonsProps {
  onLogin: () => void
  onSignup: () => void
  loginText?: string
  signupText?: string
  isAnimating?: boolean
}

export function AuthButtons({
  onLogin,
  onSignup,
  loginText = "로그인",
  signupText = "회원가입",
  isAnimating = false,
}: AuthButtonsProps) {
  return (
    <motion.div
      className="w-full max-w-xs space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -20 : 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Button
        onClick={onLogin}
        className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A] font-medium rounded-xl shadow-md shadow-[#FFB020]/20 dark:shadow-[#FFD485]/10"
      >
        {loginText}
      </Button>
      <Button
        onClick={onSignup}
        variant="outline"
        className="w-full h-12 border-[#FFB020] dark:border-[#FFD485] text-[#FFB020] dark:text-[#FFD485] hover:bg-[#FFB020]/10 dark:hover:bg-[#FFD485]/10 font-medium rounded-xl"
      >
        {signupText}
      </Button>
    </motion.div>
  )
}

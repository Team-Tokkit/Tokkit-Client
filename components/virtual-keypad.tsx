"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SkipBackIcon as Backspace, Check } from "lucide-react"

interface VirtualKeypadProps {
  maxLength?: number
  onComplete?: (password: string) => void
  hideTitle?: boolean
}
export interface VirtualKeypadHandle {
  reset: () => void
}

const VirtualKeypad = forwardRef<VirtualKeypadHandle, VirtualKeypadProps>(
  ({ maxLength = 6, onComplete, hideTitle = false }, ref) => {
    const [password, setPassword] = useState<string>("")
    const [keypadNumbers, setKeypadNumbers] = useState<number[]>([])
    const [pressedKey, setPressedKey] = useState<number | null>(null)
    const [highlightedKeys, setHighlightedKeys] = useState<number[]>([])
    const [previousHighlightedKeys, setPreviousHighlightedKeys] = useState<number[]>([])
    const highlightTimerRef = useRef<NodeJS.Timeout | null>(null)
    const fadeTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [highlightOpacity, setHighlightOpacity] = useState<number>(0.3)

    // 비밀번호가 일치 하지 않을때 필드 초기화 
    useImperativeHandle(ref, () => ({
      reset: () => {
        setPassword("")
      },
    }))

  // 키패드 숫자 랜덤 배치
  useEffect(() => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const shuffled = [...numbers].sort(() => Math.random() - 0.5)
    setKeypadNumbers([...shuffled.slice(0, 3), ...shuffled.slice(3, 6), ...shuffled.slice(6, 9)])
  }, [])

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  }, [])

  const handleNumberClick = (num: number) => {
    if (password.length < maxLength) {
      setPressedKey(num)
      setTimeout(() => setPressedKey(null), 200)

      const newPassword = password + num.toString()
      setPassword(newPassword)

      // 이전에 하이라이트된 숫자들을 제외한 숫자들 중에서 랜덤하게 선택
      const allNumbers = [...keypadNumbers, 0].filter((n) => n !== num)
      const availableNumbers = allNumbers.filter((n) => !previousHighlightedKeys.includes(n))

      // 사용 가능한 숫자가 2개 미만이면 모든 숫자를 다시 사용 가능하게 함
      let randomNumbers: number[] = []
      if (availableNumbers.length >= 2) {
        randomNumbers = availableNumbers.sort(() => Math.random() - 0.5).slice(0, 2)
      } else {
        // 이전에 선택한 숫자와 현재 선택한 숫자를 제외한 모든 숫자 중에서 선택
        const resetAvailableNumbers = allNumbers.filter((n) => n !== num)
        randomNumbers = resetAvailableNumbers.sort(() => Math.random() - 0.5).slice(0, 2)
      }

      const newHighlightedKeys = [num, ...randomNumbers]
      setHighlightedKeys(newHighlightedKeys)
      setPreviousHighlightedKeys(newHighlightedKeys)
      setHighlightOpacity(0.3)

      // 이전 타이머 정리
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)

      // 하이라이트 효과 즉시 제거 (기존 2초에서 변경)
      highlightTimerRef.current = setTimeout(() => {
        setHighlightedKeys([])
      }, 100) // 100ms 후에 하이라이트 효과 제거

      if (newPassword.length === maxLength && onComplete) {
        setTimeout(() => {
          onComplete(newPassword)
        }, 300)
      }
    }
  }

  const handleBackspace = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1))
    }
  }

  const handleSubmit = () => {
    if (password.length === maxLength && onComplete) {
      onComplete(password)
    }
  }

  // 키패드 버튼 애니메이션 변수
  const buttonVariants = {
    idle: { scale: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" },
    pressed: { scale: 0.95, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)" },
  }

  // 비밀번호 입력 애니메이션 변수
  const dotVariants = {
    empty: { scale: 0.8, opacity: 0.3 },
    filled: { scale: 1, opacity: 1 },
  }

  return (
      <div className="flex flex-col items-center w-full max-w-xs mx-auto">
        {/* Password dots */}
        <div className="flex justify-center gap-4 mb-10 w-full">
          {Array.from({ length: maxLength }).map((_, index) => (
              <motion.div
                  key={index}
                  variants={dotVariants}
                  initial="empty"
                  animate={index < password.length ? "filled" : "empty"}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-4 h-4 rounded-full ${index < password.length ? "bg-[#FFB020]" : "bg-[#E0E0E0]"}`}
              />
          ))}
        </div>

        {/* Virtual keypad */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {keypadNumbers.map((num, index) => (
              <motion.button
                  key={num}
                  variants={buttonVariants}
                  initial="idle"
                  animate={pressedKey === num ? "pressed" : "idle"}
                  whileHover={{ scale: 1.05 }}
                  whileTap="pressed"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`h-16 rounded-2xl bg-white border border-[#E0E0E0] 
                      text-xl font-medium text-[#1A1A1A] shadow-sm relative overflow-hidden`}
                  onClick={() => handleNumberClick(num)}
              >
                <span className="relative z-10">{num}</span>
                <AnimatePresence>
                  {highlightedKeys.includes(num) && (
                      <motion.div
                          className="absolute inset-0 bg-[#FFB020] rounded-2xl"
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: highlightOpacity }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                      />
                  )}
                </AnimatePresence>
              </motion.button>
          ))}

          {/* 하단 줄: 지우기, 0, 확인 버튼 */}
          <motion.button
              variants={buttonVariants}
              initial="idle"
              whileHover={{ scale: 1.05 }}
              whileTap="pressed"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="h-16 rounded-2xl bg-[#FFB020] flex items-center justify-center"
              onClick={handleBackspace}
          >
            <Backspace className="h-6 w-6 text-white" />
          </motion.button>

          <motion.button
              variants={buttonVariants}
              initial="idle"
              animate={pressedKey === 0 ? "pressed" : "idle"}
              whileHover={{ scale: 1.05 }}
              whileTap="pressed"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="h-16 rounded-2xl bg-white border border-[#E0E0E0]
                    text-xl font-medium text-[#1A1A1A] shadow-sm relative overflow-hidden"
              onClick={() => handleNumberClick(0)}
          >
            <span className="relative z-10">0</span>
            <AnimatePresence>
              {highlightedKeys.includes(0) && (
                  <motion.div
                      className="absolute inset-0 bg-[#FFB020] rounded-2xl"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: highlightOpacity }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                  />
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
              variants={buttonVariants}
              initial="idle"
              whileHover={{ scale: 1.05 }}
              whileTap="pressed"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="h-16 rounded-2xl flex items-center justify-center bg-[#FFB020]"
              onClick={handleSubmit}
              disabled={password.length !== maxLength}
          >
            <Check className="h-6 w-6 text-white" />
          </motion.button>
        </div>
      </div>
  );
});

export default VirtualKeypad;

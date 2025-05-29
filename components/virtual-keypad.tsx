"use client";

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipBackIcon as Backspace, Check } from "lucide-react";

interface VirtualKeypadProps {
  maxLength?: number;
  onComplete?: (password: string) => void;
  hideTitle?: boolean;
  disabled?: boolean; // ✅ 추가
}

export interface VirtualKeypadHandle {
  reset: () => void;
}

const VirtualKeypad = forwardRef<VirtualKeypadHandle, VirtualKeypadProps>(
  ({ maxLength = 6, onComplete, hideTitle = false, disabled = false }, ref) => {
    const [password, setPassword] = useState<string>("");
    const [keypadNumbers, setKeypadNumbers] = useState<number[]>([]);
    const [pressedKey, setPressedKey] = useState<number | null>(null);
    const [highlightedKeys, setHighlightedKeys] = useState<number[]>([]);
    const [previousHighlightedKeys, setPreviousHighlightedKeys] = useState<
      number[]
    >([]);
    const highlightTimerRef = useRef<NodeJS.Timeout | null>(null);
    const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [highlightOpacity, setHighlightOpacity] = useState<number>(0.3);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setPassword("");
      },
    }));

    useEffect(() => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const shuffled = [...numbers].sort(() => Math.random() - 0.5);
      setKeypadNumbers([
        ...shuffled.slice(0, 3),
        ...shuffled.slice(3, 6),
        ...shuffled.slice(6, 9),
      ]);
    }, []);

    useEffect(() => {
      return () => {
        if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      };
    }, []);

    const handleNumberClick = (num: number) => {
      if (disabled || password.length >= maxLength) return;

      setPressedKey(num);
      setTimeout(() => setPressedKey(null), 200);

      const newPassword = password + num.toString();
      setPassword(newPassword);

      const allNumbers = [...keypadNumbers, 0].filter((n) => n !== num);
      const availableNumbers = allNumbers.filter(
        (n) => !previousHighlightedKeys.includes(n)
      );

      let randomNumbers: number[] = [];
      if (availableNumbers.length >= 2) {
        randomNumbers = availableNumbers
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);
      } else {
        const resetAvailableNumbers = allNumbers.filter((n) => n !== num);
        randomNumbers = resetAvailableNumbers
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);
      }

      const newHighlightedKeys = [num, ...randomNumbers];
      setHighlightedKeys(newHighlightedKeys);
      setPreviousHighlightedKeys(newHighlightedKeys);
      setHighlightOpacity(0.3);

      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

      highlightTimerRef.current = setTimeout(() => {
        setHighlightedKeys([]);
      }, 100);

      if (newPassword.length === maxLength && onComplete) {
        setTimeout(() => {
          onComplete(newPassword);
        }, 300);
      }
    };

    const handleBackspace = () => {
      if (disabled || password.length === 0) return;
      setPassword(password.slice(0, -1));
    };

    const handleSubmit = () => {
      if (disabled || password.length !== maxLength) return;
      onComplete?.(password);
    };

    const buttonVariants = {
      idle: { scale: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" },
      pressed: { scale: 0.95, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)" },
    };

    const dotVariants = {
      empty: { scale: 0.8, opacity: 0.3 },
      filled: { scale: 1, opacity: 1 },
    };

    return (
      <div className="flex flex-col items-center w-full max-w-xs mx-auto">
        <div className="flex justify-center gap-4 mb-10 w-full">
          {Array.from({ length: maxLength }).map((_, index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              initial="empty"
              animate={index < password.length ? "filled" : "empty"}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-4 h-4 rounded-full ${
                index < password.length ? "bg-[#FFB020]" : "bg-[#E0E0E0]"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          {keypadNumbers.map((num) => (
            <motion.button
              key={num}
              data-cy={`digit-button-${num}`}
              variants={buttonVariants}
              initial="idle"
              animate={pressedKey === num ? "pressed" : "idle"}
              whileHover={!disabled ? { scale: 1.05 } : undefined}
              whileTap={!disabled ? "pressed" : undefined}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`h-16 rounded-2xl bg-white border border-[#E0E0E0] text-xl font-medium text-[#1A1A1A] shadow-sm relative overflow-hidden ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleNumberClick(num)}
              disabled={disabled}
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

          {/* 지우기 */}
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover={!disabled ? { scale: 1.05 } : undefined}
            whileTap={!disabled ? "pressed" : undefined}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`h-16 rounded-2xl bg-[#FFB020] flex items-center justify-center ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleBackspace}
            disabled={disabled}
          >
            <Backspace className="h-6 w-6 text-white" />
          </motion.button>

          {/* 0번 키 */}
          <motion.button
            variants={buttonVariants}
            data-cy="digit-button-0"
            initial="idle"
            animate={pressedKey === 0 ? "pressed" : "idle"}
            whileHover={!disabled ? { scale: 1.05 } : undefined}
            whileTap={!disabled ? "pressed" : undefined}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`h-16 rounded-2xl bg-white border border-[#E0E0E0] text-xl font-medium text-[#1A1A1A] shadow-sm relative overflow-hidden ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleNumberClick(0)}
            disabled={disabled}
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

          {/* 확인 버튼 */}
          <motion.button
            data-cy="submit-button"
            variants={buttonVariants}
            initial="idle"
            whileHover={!disabled ? { scale: 1.05 } : undefined}
            whileTap={!disabled ? "pressed" : undefined}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`h-16 rounded-2xl flex items-center justify-center ${
              disabled || password.length !== maxLength
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#FFB020]"
            }`}
            onClick={handleSubmit}
            disabled={disabled || password.length !== maxLength}
          >
            <Check className="h-6 w-6 text-white" />
          </motion.button>
        </div>
      </div>
    );
  }
);

export default VirtualKeypad;

import { motion } from "framer-motion";
import VirtualKeypad from "@/components/virtual-keypad";

interface PasswordStepProps {
  onComplete: (password: string) => void;
}

export default function PasswordStep({ onComplete }: PasswordStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
      <VirtualKeypad
        onComplete={onComplete}
        title="간편 비밀번호 입력"
        subtitle="전환을 완료하려면 비밀번호를 입력하세요"
      />
    </motion.div>
  );
}

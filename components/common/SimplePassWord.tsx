import { motion } from "framer-motion";
import VirtualKeypad from "@/components/virtual-keypad";

interface SimplePassWordProps {
  onComplete: (password: string) => void;
  isConfirm?: boolean;
}

export default function PasswordStep({
  onComplete,
  isConfirm = false,
}: SimplePassWordProps) {
<<<<<<< HEAD
  const title = isConfirm ? "간편 비밀번호 재입력" : "간편 비밀번호 입력";
  const subtitle = isConfirm
    ? "다시 한 번 입력해주세요"
    : "전환을 완료하려면 비밀번호를 입력하세요";

=======
>>>>>>> b72639757e7ba765ec0a6f6a5f0c32f8f052abbd
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
<<<<<<< HEAD
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <VirtualKeypad onComplete={onComplete} />
=======
      <VirtualKeypad
        onComplete={onComplete}
        title={isConfirm ? "간편 비밀번호 재입력" : "간편 비밀번호 입력"}
        subtitle={
          isConfirm
            ? "다시 한 번 입력해주세요"
            : "전환을 완료하려면 비밀번호를 입력하세요"
        }
      />
>>>>>>> b72639757e7ba765ec0a6f6a5f0c32f8f052abbd
    </motion.div>
  );
}

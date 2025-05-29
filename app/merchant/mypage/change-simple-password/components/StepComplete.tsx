"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

export default function StepComplete({ onDone }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <img
        src="/images/bunny-complete.png"
        alt="Security Mascot"
        className="mx-auto mb-6 w-1/2"
      />

      <h2 className="text-xl font-bold mb-2 text-[#111827]">
        비밀번호 변경 완료
      </h2>
      <p className="text-[#666666] mb-8">
        간편 비밀번호가 성공적으로 변경되었습니다.
      </p>

      <Button
        data-cy="complete-button"
        className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white"
        onClick={onDone}
      >
        마이페이지로 돌아가기
      </Button>
    </motion.div>
  );
}

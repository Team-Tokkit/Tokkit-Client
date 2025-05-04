import { motion } from "framer-motion";
import Image from "next/image";

interface ProcessingStepProps {
  type: "deposit-to-token" | "token-to-deposit";
}

export default function ProcessingStep({ type }: ProcessingStepProps) {
  const isDepositToToken = type === "deposit-to-token";

  const imageSrc = isDepositToToken
    ? "/images/token-to-deposit.gif"
    : "/images/deposit-to-token.gif";

  const altText = isDepositToToken
    ? "토큰을 예금으로 전환"
    : "예금을 토큰으로 전환";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <Image
            src={imageSrc}
            alt={altText}
            width={200}
            height={200}
            className="w-auto h-40 object-contain"
          />
        </div>
        <p className="text-lg font-medium text-[#1A1A1A]">전환중입니다.</p>
        <p className="text-sm text-[#666666] mt-2">잠시만 기다려주세요...</p>
      </div>
    </motion.div>
  );
}

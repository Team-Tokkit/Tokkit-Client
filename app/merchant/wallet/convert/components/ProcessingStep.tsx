import { motion } from "framer-motion";
import Image from "next/image";

interface ProcessingStepProps {
  type: "deposit-to-token" | "token-to-deposit";
}

export default function ProcessingStep({ type }: ProcessingStepProps) {
  const isDepositToToken = type === "deposit-to-token";

  const imageSrc = isDepositToToken
    ? "/images/deposit-to-token.gif"
    : "/images/token-to-deposit.gif";

  const altText = isDepositToToken
    ? "예금을 토큰으로 전환"
    : "토큰을 예금으로 전환";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center min-h-[calc(100vh-60px)]"
    >
      <div className="flex flex-col items-center justify-center w-full">
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

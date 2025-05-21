import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ConvertPreview from "@/app/wallet/components/convert/ConvertPreview";
import InfoBox from "@/app/wallet/components/common/InfoBox";

interface ConfirmStepProps {
  type: "deposit-to-token" | "token-to-deposit";
  amount: string;
  depositBalance: number;
  tokenBalance: number;
  onBack: () => void;
  onConfirm: () => void;
}

export default function ConfirmStep({
  type,
  amount,
  depositBalance,
  tokenBalance,
  onBack,
  onConfirm,
}: ConfirmStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col flex-1 px-5 pb-6 overflow-hidden">
        <div className="flex-grow flex flex-col">
          <div className="mb-2">
            <ConvertPreview
              type={type}
              amount={amount}
              depositBalance={depositBalance}
              tokenBalance={tokenBalance}
            />
          </div>

          <InfoBox>
            전환 후에는 취소할 수 없으며, 다시 토큰으로 전환하려면 별도의 절차가
            필요합니다.
          </InfoBox>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            className="flex-1 h-12 text-[#666666] border-[#E0E0E0] rounded-xl"
            onClick={onBack}
          >
            이전
          </Button>
          <Button
            className="flex-1 h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md"
            onClick={onConfirm}
          >
            전환하기
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

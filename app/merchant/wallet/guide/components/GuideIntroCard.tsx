import { Wallet } from "lucide-react";

export default function WalletIntroCard() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-[#FFB020]/20  flex items-center justify-center mr-3">
          <Wallet className="h-5 w-5 text-[#FFB020]" />
        </div>
        <h2 className="text-lg font-bold text-[#1A1A1A]">
          전자지갑 소개
        </h2>
      </div>
      <p className="text-sm text-[#666666] leading-relaxed">
        Tokkit 전자지갑은 중앙은행 디지털 화폐(CBDC)를 안전하게 보관하고 사용할
        수 있는 서비스입니다. 예금을 토큰으로 전환하여 결제, 송금 등 다양한 금융
        활동을 할 수 있습니다.
      </p>
    </div>
  );
}

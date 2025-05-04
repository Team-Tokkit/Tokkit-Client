"use client";

import { motion } from "framer-motion";
import WalletHeader from "@/components/wallet/common/WalletHeader";
import GuideIntroCard from "@/components/wallet/guide/GuideIntroCard";
import GuideList from "@/components/wallet/guide/GuideList";
import InfoBox from "@/components/wallet/common/InfoBox";

export default function WalletGuidePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <WalletHeader title="전자지갑 이용 안내" />

      <div className="flex-1 flex flex-col p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GuideIntroCard />
          <GuideList />
          <InfoBox>
            <p>더 자세한 내용은 고객센터(1234-5678)로 문의해주세요.</p>
            <p>운영 시간: 평일 09:00 ~ 18:00</p>
          </InfoBox>
        </motion.div>
      </div>
    </div>
  );
}

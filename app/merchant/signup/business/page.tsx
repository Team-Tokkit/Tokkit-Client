"use client";

import { useState } from "react";
import BusinessHeader from "./components/BusinessHeader";
import CaptureStep from "./components/CaptureStep";
import InfoStep from "./components/InfoStep";
import AddressSearchModal from "./components/AddressSearchModal";

export default function BusinessSignupPage() {
  const [formStep, setFormStep] = useState<"capture" | "info">("capture");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [roadAddress, setRoadAddress] = useState("");

    return (
         <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* 헤더 + 마스코트 이미지 */}
      <BusinessHeader onBack={() => window.history.back()} />

      {/* 본문 */}
      <div className="flex-1 flex flex-col p-6">
        {formStep === "capture" ? (
          <CaptureStep onNext={() => setFormStep("info")} />
        ) : (
          <InfoStep
            onAddressSearch={() => setShowAddressModal(true)}
            roadAddress={roadAddress}
            setRoadAddress={setRoadAddress}
          />
        )}
      </div>

      {/* 주소 검색 모달 */}
      {showAddressModal && (
        <AddressSearchModal
          onClose={() => setShowAddressModal(false)}
          initialKeyword={roadAddress}
        />
      )}
    </div>
    )
}

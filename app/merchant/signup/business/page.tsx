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

    const handleAddressSelect = (data: {
        businessAddress: string;
        latitude: string;
        longitude: string;
        zipcode: string;
        sido: string;
        sigungu: string;
    }) => {
        setRoadAddress(data.businessAddress); // 주소 필드 채우기
        setShowAddressModal(false); // 모달 닫기
        // 필요하면 위도, 경도 등도 상태에 저장 가능
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#121212] flex flex-col">
            {/* 헤더 */}
            <BusinessHeader onBack={() => window.history.back()} />

            {/* 본문 영역 */}
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
                    onSelect={handleAddressSelect}
                />
            )}
        </div>
    );
}

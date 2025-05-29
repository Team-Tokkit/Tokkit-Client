"use client"

import { useState } from "react"
import BusinessHeader from "./components/BusinessHeader"
import CaptureStep from "./components/CaptureStep"
import InfoStep from "./components/InfoStep"

export default function BusinessSignupPage() {
    const [formStep, setFormStep] = useState<"capture" | "info">("capture")

    return (
        <div className="min-h-screen bg-[#FAFAFA]  flex flex-col">
            <BusinessHeader onBack={() => window.history.back()} />
            <div className="flex-1 flex flex-col p-6">
                {formStep === "capture" ? (
                    <CaptureStep onNext={() => setFormStep("info")} />
                ) : (
                    <InfoStep onAddressSearch={() => {}} />
                )}
            </div>
        </div>
    )
}

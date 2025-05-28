"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import CaptureStep from "@/app/merchant/signup/wallet/verify/components/CaptureStep";
import ReviewStep from "@/app/merchant/signup/wallet/verify/components/ReviewStep";

export type VerificationStep = "input" | "capture" | "review";

export default function WalletVerifyPage() {
    const router = useRouter();
    const [step, setStep] = useState<VerificationStep>("capture");

    // 사용자 입력 상태
    const [name, setName] = useState("");
    const [residentIdFront, setResidentIdFront] = useState("");
    const [residentIdBack, setResidentIdBack] = useState("");
    const [issueDate, setIssueDate] = useState("");

    // OCR 데이터 수신 여부 체크
    const [isCaptured, setIsCaptured] = useState(false);

    // 선택된 업로드 방식 상태
    const [selectedMethod, setSelectedMethod] = useState<"camera" | "upload" | null>(null);

    // UI 상태
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // ref (자동 포커스 이동용)
    const residentIdBackRef = useRef<HTMLInputElement>(null!);
    const issueDateRef = useRef<HTMLInputElement>(null!);

    const handleFinalSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await new Promise((res) => setTimeout(res, 1000));
            setSuccess("본인인증이 완료되었습니다.");
            sessionStorage.setItem(
                "verifiedName",
                name // OCR로 추출한 이름
            );
            setTimeout(() => {
                router.push("/merchant/signup/wallet/contact");
            }, 1200);
        } catch (e) {
            setError("본인인증에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#F9FAFB]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* 헤더 */}
            <header className="p-4 flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5 text-[#1A1A1A]" />
                </Button>
                <motion.h1
                    className="text-xl font-bold text-[#1A1A1A]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    본인인증
                </motion.h1>
            </header>

            <div className="flex-1 justify-center items-center flex flex-col items-center px-4 pb-10">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center text-center mt-4 mb-6">
                        <ShieldCheck className="w-16 h-16 text-[#FFD485] mb-3" />
                        <h2 className="text-xl font-bold text-[#1A1A1A]">본인인증</h2>
                        <p className="text-sm text-[#666666] mt-2">
                            전자지갑 개설을 위해 본인인증이 필요합니다.
                            <br />정확한 정보를 입력해주세요.
                        </p>
                    </div>

                    {step === "capture" && (
                        <CaptureStep
                            onNext={() => setStep("review")}
                            onRetry={() => setStep("capture")}
                            onBack={() => router.back()}
                            selectedMethod={selectedMethod}
                            setSelectedMethod={setSelectedMethod}
                            setCapturedData={(data: { name: string; residentIdFront: string; residentIdBack: string; issueDate: string }) => {
                                try {
                                    setName(data.name ?? "");
                                    setResidentIdFront(data.residentIdFront ?? "");
                                    setResidentIdBack(data.residentIdBack ?? "");
                                    setIssueDate((data.issueDate ?? "").replaceAll(".", ""));
                                    setIsCaptured(true);
                                } catch (e) {
                                    alert("OCR 인식 실패: " + (e as Error).message);
                                    setStep("capture");
                                }
                            }}
                        />
                    )}

                    {step === "review" && (
                        <ReviewStep
                            name={name}
                            residentIdFront={residentIdFront}
                            residentIdBack={residentIdBack}
                            issueDate={issueDate}
                            onChangeName={(val) => {
                                setName(val);
                                setIsCaptured(true);
                            }}
                            onChangeResidentIdFront={(val) => {
                                setResidentIdFront(val);
                                setIsCaptured(true);
                            }}
                            onChangeResidentIdBack={(val) => {
                                setResidentIdBack(val);
                                setIsCaptured(true);
                            }}
                            onChangeIssueDate={(val) => {
                                setIssueDate(val);
                                setIsCaptured(true);
                            }}
                            onRetryCapture={() => setStep("capture")}
                            onSubmit={handleFinalSubmit}
                            isLoading={isLoading}
                            residentIdBackRef={residentIdBackRef}
                            issueDateRef={issueDateRef}
                            success={success}
                            error={error}
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
}

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import VirtualKeypad from "@/components/virtual-keypad";

interface Props {
    onComplete: (password: string) => void;
    isLoading?: boolean;
}

export default function SimplePasswordStep({ onComplete, isLoading = false }: Props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState<"first" | "confirm">("first");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleKeypadComplete = (pinCode: string) => {
        if (step === "first") {
            setPassword(pinCode);
            setStep("confirm");
        } else {
            setConfirmPassword(pinCode);

            if (pinCode !== password) {
                setError("비밀번호가 일치하지 않습니다.");
                setTimeout(() => {
                    setConfirmPassword("");
                    setError(null);
                    setStep("first");
                }, 1500);
                return;
            }

            setSuccess("비밀번호가 설정되었습니다.");
            onComplete(pinCode);
        }
    };

    const resetPassword = () => {
        setPassword("");
        setConfirmPassword("");
        setStep("first");
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="w-full max-w-xs mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                >
                    {step === "confirm" && (
                        <motion.div
                            className="mb-8 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">간편 비밀번호 재입력</h2>
                        </motion.div>
                    )}

                    <VirtualKeypad
                        onComplete={handleKeypadComplete}
                        maxLength={6}
                        scramble
                    />
                </motion.div>
            </AnimatePresence>

            {/* 메시지 */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        className="mt-6 flex items-center justify-center p-3 bg-[#FFF0F0] rounded-lg text-[#FF6B6B]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p className="text-sm">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {success && (
                    <motion.div
                        className="mt-6 flex items-center justify-center p-3 bg-[#F0FFF4] rounded-lg text-[#38A169]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        <p className="text-sm">{success}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {step === "confirm" && !isLoading && (
                <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        variant="outline"
                        onClick={resetPassword}
                        className="flex items-center border-[#FFB020] text-[#FFB020] hover:bg-[#FFF8E8] hover:text-[#F0A010]"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        처음부터 다시 입력하기
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

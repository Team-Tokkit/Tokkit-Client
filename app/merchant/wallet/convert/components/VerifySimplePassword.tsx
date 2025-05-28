"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import VirtualKeypad from "@/components/virtual-keypad";

interface VirtualKeypadProps {
    onComplete: (pinCode: string) => Promise<void>;
    maxLength: number;
    disabled?: boolean;
}

interface Props {
    onVerified: (password: string) => void;
}

export default function VerifySimplePassword({ onVerified }: Props) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleKeypadComplete = async (pinCode: string) => {
        setIsLoading(true);
        setError(null);

        try {
            setPassword(pinCode);
            onVerified(pinCode);
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setPassword("");
        setError(null);
    };

    return (
        <div className="w-full max-w-xs mx-auto">
            <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">간편 비밀번호 입력</h2>
            </motion.div>

            <VirtualKeypad
                onComplete={handleKeypadComplete}
                maxLength={6}
                disabled={isLoading}
            />

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

            {error && (
                <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        variant="outline"
                        onClick={reset}
                        className="flex items-center border-[#FFB020] text-[#FFB020] hover:bg-[#FFF8E8] hover:text-[#F0A010]"
                    >
                        다시 입력하기
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

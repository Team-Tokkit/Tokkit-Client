import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
    email: string;
    setEmail: (value: string) => void;
    loading: boolean;
    onSubmit: (email: string) => Promise<string | null>; // 실패 시 메시지 리턴
}

export default function ResetPasswordForm({ email, setEmail, loading, onSubmit }: Props) {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setError("올바른 이메일 주소를 입력해주세요.");
            return;
        }

        setError(null);
        const serverError = await onSubmit(email);
        if (serverError) {
            setError(serverError);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="text-xl font-bold text-[#1A1A1A] mb-2">임시 비밀번호 발급</h1>
            <p className="text-sm text-[#666666] mb-6">
                가입된 이메일 주소를 입력하시면<br />임시 비밀번호를 이메일로 보내드립니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Input
                        type="email"
                        placeholder="이메일 주소 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    {error && (
                        <p className="text-sm text-red-500 mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {error}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 mt-2 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            처리 중...
                        </>
                    ) : (
                        "임시 비밀번호 발급하기"
                    )}
                </Button>
            </form>
        </motion.div>
    );
}

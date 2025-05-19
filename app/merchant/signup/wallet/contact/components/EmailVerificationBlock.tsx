import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

interface Props {
    email: string;
    setEmail: (val: string) => void;
    verificationCode: string;
    setVerificationCode: (val: string) => void;
    isEmailSent: boolean;
    isVerified: boolean;
    remainingTime: number;
    handleSendVerification: () => void;
    handleVerifyCode: () => void;
    isLoading: boolean;
}

export default function EmailVerificationBlock({
                                                   email,
                                                   setEmail,
                                                   verificationCode,
                                                   setVerificationCode,
                                                   isEmailSent,
                                                   isVerified,
                                                   remainingTime,
                                                   handleSendVerification,
                                                   handleVerifyCode,
                                                   isLoading,
                                               }: Props) {
    const verificationCodeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEmailSent && verificationCodeRef.current) {
            verificationCodeRef.current.focus();
        }
    }, [isEmailSent]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // 영문자도 허용
        setVerificationCode(value.slice(0, 6));
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="email" className="text-[#444444] text-sm font-medium">
                이메일
            </Label>
            <div className="flex space-x-2">
                <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isVerified}
                    className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                />
                <Button
                    type="button"
                    onClick={handleSendVerification}
                    disabled={isLoading || isVerified || !email}
                    className="h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
                >
                    인증요청
                </Button>
            </div>

            {isEmailSent && !isVerified && (
                <div className="space-y-3 p-4 bg-[#F9F9F9] rounded-xl border border-[#E0E0E0] mt-4">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="verificationCode" className="text-[#444444] text-sm font-medium">
                            인증 코드
                        </Label>
                        <div className="flex items-center text-[#FFB020]">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">{formatTime(remainingTime)}</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Input
                            id="verificationCode"
                            placeholder="인증 코드 6자리"
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            required
                            maxLength={6}
                            className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                            ref={verificationCodeRef}
                        />
                        <Button
                            type="button"
                            onClick={handleVerifyCode}
                            disabled={isLoading || verificationCode.length !== 6}
                            className="h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
                        >
                            확인
                        </Button>
                    </div>
                    <p className="text-xs text-[#999999]">이메일로 전송된 6자리 인증 코드를 입력하세요.</p>
                </div>
            )}
        </div>
    );
}

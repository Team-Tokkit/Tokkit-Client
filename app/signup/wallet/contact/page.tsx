"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

import EmailVerificationBlock from "@/app/signup/wallet/contact/components/EmailVerificationBlock";
import PasswordInputBlock from "@/app/signup/wallet/contact/components/PasswordInputBlock";
import PhoneInputBlock from "@/app/signup/wallet/contact/components/PhoneInputBlock";
import FormFeedbackMessage from "@/app/signup/wallet/contact/components/FormFeedbackMessage";
import SubmitButton from "@/app/signup/wallet/contact/components/SubmitButton";
import { sendEmailVerificationCode, verifyEmailCode, submitContactInfo } from "@/app/signup/wallet/contact/api/register-auth";

export default function WalletContactPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [remainingTime, setRemainingTime] = useState(300);
    const [verificationAttempts, setVerificationAttempts] = useState(0);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [phoneNumber, setPhone] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const passwordValidation = {
        hasLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        passwordsMatch: password === confirmPassword && password !== "",
    };

    const isPasswordValid =
        passwordValidation.hasLength &&
        passwordValidation.hasUpperCase &&
        passwordValidation.hasLowerCase &&
        passwordValidation.hasSpecialChar;

    useEffect(() => {
        const storedName = sessionStorage.getItem("verifiedName");
        if (storedName) {
            setName(storedName);
        }

        let timer: NodeJS.Timeout;
        if (isEmailSent && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);
        } else if (remainingTime === 0 && isEmailSent) {
            setIsEmailSent(false);
            setError("인증 시간이 만료되었습니다. 다시 인증해주세요.");
        }

        return () => clearInterval(timer);
    }, [isEmailSent, remainingTime]);

    const handleSendVerification = async () => {
        setIsLoading(true);
        setError(null);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("유효한 이메일 주소를 입력해주세요.");
            setIsLoading(false);
            return;
        }
        try {
            await sendEmailVerificationCode(email);
            setIsEmailSent(true);
            setSuccess("인증 코드가 이메일로 전송되었습니다.");
            setRemainingTime(300);
            setVerificationAttempts((prev) => prev + 1);
            if (verificationAttempts >= 4) {
                setError("최대 인증 시도 횟수를 초과했습니다. 24시간 후에 다시 시도해주세요.");
                setIsEmailSent(false);
            }
        } catch {
            setError("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await verifyEmailCode(email, verificationCode);
            setIsVerified(true);
            setIsEmailSent(false);
            setSuccess("이메일 인증이 완료되었습니다.");
        } catch {
            setError("인증에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        const formatted =
            raw.length <= 3
                ? raw
                : raw.length <= 7
                    ? `${raw.slice(0, 3)}-${raw.slice(3)}`
                    : `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
        setPhone(formatted);
    };

    const handleNext = () => {
        setError(null);
        setSuccess(null);

        if (!isVerified) return setError("이메일 인증을 완료해주세요.");
        if (!isPasswordValid) return setError("비밀번호는 8자 이상, 대문자, 소문자, 특수문자를 포함해야 합니다.");
        if (!passwordValidation.passwordsMatch) return setError("비밀번호가 일치하지 않습니다.");
        if (!/^[0-9]{10,11}$/.test(phoneNumber.replace(/-/g, ""))) return setError("유효한 전화번호를 입력해주세요.");

        const payload = { email, password, phoneNumber, name, };
        sessionStorage.setItem("signupPayload", JSON.stringify(payload));

        router.push("/signup/wallet/password");
    };


    return (
        <motion.div
            className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#F9FAFB]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }}
            transition={{ duration: 0.3 }}
        >
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
                    연락처 정보
                </motion.h1>
            </header>

            <div className="flex-1 flex flex-col items-center p-6">
                <div className="w-full max-w-md">
                    <motion.div className="mb-8 flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <div className="w-16 h-16 rounded-full bg-[#FFB020]/20 flex items-center justify-center mb-4">
                            <Mail className="h-8 w-8 text-[#FFB020]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">연락처 정보</h2>
                        <p className="text-[#666666] text-sm text-center">전자지갑 개설을 위한 연락처 정보를 입력해주세요.</p>
                    </motion.div>

                    <motion.div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-[#F0F0F0]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <EmailVerificationBlock
                            email={email}
                            setEmail={setEmail}
                            verificationCode={verificationCode}
                            setVerificationCode={setVerificationCode}
                            isEmailSent={isEmailSent}
                            isVerified={isVerified}
                            remainingTime={remainingTime}
                            handleSendVerification={handleSendVerification}
                            handleVerifyCode={handleVerifyCode}
                            isLoading={isLoading}
                        />

                        {isVerified && (
                            <>
                                <PasswordInputBlock
                                    password={password}
                                    confirmPassword={confirmPassword}
                                    setPassword={setPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    showConfirmPassword={showConfirmPassword}
                                    setShowConfirmPassword={setShowConfirmPassword}
                                    passwordValidation={passwordValidation}
                                    passwordRef={passwordRef as React.RefObject<HTMLInputElement>}
                                    confirmPasswordRef={confirmPasswordRef as React.RefObject<HTMLInputElement>}
                                />
                                <PhoneInputBlock phoneNumber={phoneNumber} onChange={handlePhoneChange} phoneRef={phoneRef as React.RefObject<HTMLInputElement>} />
                            </>
                        )}

                        <FormFeedbackMessage error={error} success={success} />
                    </motion.div>

                    <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                        <SubmitButton
                            isLoading={isLoading}
                            isDisabled={
                                !isVerified ||
                                !password ||
                                !confirmPassword ||
                                !passwordValidation.passwordsMatch ||
                                !isPasswordValid ||
                                !phoneNumber
                            }
                            onClick={handleNext}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

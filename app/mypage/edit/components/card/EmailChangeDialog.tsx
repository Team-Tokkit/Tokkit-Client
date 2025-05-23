"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmailChangeDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    newEmail: string;
    setNewEmail: (value: string) => void;
    verificationCode: string;
    setVerificationCode: (value: string) => void;
    isVerificationSent: boolean;
    handleSendVerification: () => void;
    handleVerifyEmail: () => void;
}

export default function EmailChangeDialog({
                                              isOpen,
                                              setIsOpen,
                                              newEmail,
                                              setNewEmail,
                                              verificationCode,
                                              setVerificationCode,
                                              isVerificationSent,
                                              handleSendVerification,
                                              handleVerifyEmail,
                                          }: EmailChangeDialogProps) {
    const router = useRouter();

    const isValidEmail = (email: string) => {
        return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleConfirm = async () => {
        await handleVerifyEmail();

        // 쿠키 삭제
        document.cookie = "accessToken=; path=/; max-age=0";
        document.cookie = "refreshToken=; path=/; max-age=0";

        router.push("/login");
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-200 hover:bg-amber-50 hover:text-amber-700 transition-all"
                >
                    변경
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-lg border-0 shadow-lg bg-white">
                <DialogHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-t-lg">
                    <DialogTitle className="text-lg font-semibold text-amber-800">이메일 변경</DialogTitle>
                    <DialogDescription className="text-amber-700 opacity-90">
                        새 이메일 주소를 입력하고 인증 코드를 확인하세요.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 p-4">
                    <div className="space-y-2">
                        <Label htmlFor="newEmail" className="text-sm font-medium">
                            새 이메일
                        </Label>
                        <Input
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="새 이메일 주소"
                            className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                        />
                    </div>

                    {!isVerificationSent ? (
                        <Button
                            onClick={handleSendVerification}
                            disabled={!isValidEmail(newEmail)}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white transition-all"
                        >
                            인증 코드 발송
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <Alert className="bg-blue-50 border-blue-100 text-blue-800">
                                <Info className="h-4 w-4 text-blue-500" />
                                <AlertDescription>
                                    인증 코드가 {newEmail}로 발송되었습니다.
                                </AlertDescription>
                            </Alert>
                            <div className="space-y-2">
                                <Label htmlFor="verificationCode" className="text-sm font-medium">
                                    인증 코드
                                </Label>
                                <Input
                                    id="verificationCode"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="인증 코드 6자리"
                                    className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter className="p-4 rounded-b-lg flex flex-row justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="border-gray-300 hover:bg-gray-100"
                    >
                        취소
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!isVerificationSent || !verificationCode}
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                        확인
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

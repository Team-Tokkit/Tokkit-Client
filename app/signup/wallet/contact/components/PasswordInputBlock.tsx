import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Check, X } from "lucide-react";
import React from "react";

interface PasswordValidation {
    hasLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasSpecialChar: boolean;
    passwordsMatch: boolean;
}

interface Props {
    password: string;
    confirmPassword: string;
    setPassword: (val: string) => void;
    setConfirmPassword: (val: string) => void;
    showPassword: boolean;
    setShowPassword: (val: boolean) => void;
    showConfirmPassword: boolean;
    setShowConfirmPassword: (val: boolean) => void;
    passwordValidation: PasswordValidation;
    passwordRef: React.RefObject<HTMLInputElement>;
    confirmPasswordRef: React.RefObject<HTMLInputElement>;
}

export default function PasswordInputBlock({
                                               password,
                                               confirmPassword,
                                               setPassword,
                                               setConfirmPassword,
                                               showPassword,
                                               setShowPassword,
                                               showConfirmPassword,
                                               setShowConfirmPassword,
                                               passwordValidation,
                                               passwordRef,
                                               confirmPasswordRef,
                                           }: Props) {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="password" className="text-[#444444] text-sm font-medium flex items-center">
                    <Lock className="h-4 w-4 mr-1" />
                    비밀번호
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0 pr-10"
                        ref={passwordRef}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>

                {/* 비밀번호 유효성 표시 */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className={`flex items-center text-xs ${passwordValidation.hasLength ? "text-green-600" : "text-gray-500"}`}>
                        {passwordValidation.hasLength ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                        8자 이상
                    </div>
                    <div className={`flex items-center text-xs ${passwordValidation.hasUpperCase ? "text-green-600" : "text-gray-500"}`}>
                        {passwordValidation.hasUpperCase ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                        대문자 포함
                    </div>
                    <div className={`flex items-center text-xs ${passwordValidation.hasLowerCase ? "text-green-600" : "text-gray-500"}`}>
                        {passwordValidation.hasLowerCase ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                        소문자 포함
                    </div>
                    <div className={`flex items-center text-xs ${passwordValidation.hasSpecialChar ? "text-green-600" : "text-gray-500"}`}>
                        {passwordValidation.hasSpecialChar ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                        특수문자 포함
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#444444] text-sm font-medium flex items-center">
                    <Lock className="h-4 w-4 mr-1" />
                    비밀번호 확인
                </Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="비밀번호를 다시 입력하세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0 pr-10"
                        ref={confirmPasswordRef}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>

                {/* 비밀번호 일치 여부 표시 */}
                {confirmPassword && (
                    <div
                        className={`flex items-center text-xs mt-1 ${passwordValidation.passwordsMatch ? "text-green-600" : "text-red-500"}`}
                    >
                        {passwordValidation.passwordsMatch ? (
                            <>
                                <Check className="h-3 w-3 mr-1" /> 비밀번호가 일치합니다.
                            </>
                        ) : (
                            <>
                                <X className="h-3 w-3 mr-1" /> 비밀번호가 일치하지 않습니다.
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

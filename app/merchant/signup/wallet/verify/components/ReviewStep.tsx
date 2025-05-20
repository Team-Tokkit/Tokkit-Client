"use client";

import { FC, RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ReviewStepProps {
    name: string;
    residentIdFront: string;
    residentIdBack: string;
    issueDate: string;
    onChangeName: (value: string) => void;
    onChangeResidentIdFront: (value: string) => void;
    onChangeResidentIdBack: (value: string) => void;
    onChangeIssueDate: (value: string) => void;
    onRetryCapture: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    residentIdBackRef: RefObject<HTMLInputElement>;
    issueDateRef: RefObject<HTMLInputElement>;
    success: string | null;
    error: string | null;
}

const ReviewStep: FC<ReviewStepProps> = ({
                                             name,
                                             residentIdFront,
                                             residentIdBack,
                                             issueDate,
                                             onChangeName,
                                             onChangeResidentIdFront,
                                             onChangeResidentIdBack,
                                             onChangeIssueDate,
                                             onRetryCapture,
                                             onSubmit,
                                             isLoading,
                                             residentIdBackRef,
                                             issueDateRef,
                                             success,
                                             error,
                                         }) => {
    return (
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-[#F0F0F0]">
            <div className="text-center">
                <h3 className="text-lg font-medium mb-2">인식 결과 확인</h3>
                <p className="text-sm text-[#666666]">
                    신분증에서 인식된 정보를 확인하고 필요한 경우 수정해주세요.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#444444] text-sm font-medium">
                        이름
                    </Label>
                    <Input
                        id="name"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={(e) => onChangeName(e.target.value)}
                        required
                        className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="residentId" className="text-[#444444] text-sm font-medium">
                        주민등록번호
                    </Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            id="residentIdFront"
                            placeholder="앞 6자리"
                            value={residentIdFront}
                            onChange={(e) => onChangeResidentIdFront(e.target.value)}
                            required
                            maxLength={6}
                            className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                        />
                        <span className="text-[#666666]">-</span>
                        <Input
                            id="residentIdBack"
                            placeholder="뒤 7자리"
                            type="text"
                            value={residentIdBack ? residentIdBack[0] + "******" : ""}
                            onChange={(e) => onChangeResidentIdBack(e.target.value)}
                            required
                            maxLength={7}
                            className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                            ref={residentIdBackRef}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="issueDate" className="text-[#444444] text-sm font-medium">
                        주민등록증 발급일자
                    </Label>
                    <Input
                        id="issueDate"
                        placeholder="YYYYMMDD (예: 20200101)"
                        value={issueDate}
                        onChange={(e) => onChangeIssueDate(e.target.value)}
                        required
                        maxLength={8}
                        className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                        ref={issueDateRef}
                    />
                    <p className="text-xs text-[#999999]">
                        주민등록증에 기재된 발급일자 8자리를 입력하세요.
                    </p>
                </div>
            </div>

            <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={onRetryCapture}>
                    다시 촬영
                </Button>
                <Button
                    className="flex-1 bg-[#FFB020] hover:bg-[#FF9500] text-white"
                    onClick={onSubmit}
                    disabled={
                        isLoading ||
                        !name?.trim() ||
                        residentIdFront.length !== 6 ||
                        residentIdBack.length !== 7 ||
                        issueDate.length !== 8
                    }
                >
                    {isLoading ? "처리 중..." : "인증하기"}
                </Button>
            </div>

            {success && (
                <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-2">
                    {success}
                </div>
            )}

            {error && (
                <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                    {error}
                </div>
            )}
        </div>
    );
};

export default ReviewStep;

"use client";

import { useEffect, useState } from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import Header from "@/components/common/Header";
import {fetchMerchantWalletInfo} from "@/app/merchant/dashboard/api/merchant-wallet-info";
import {verifyMerchantSimplePassword} from "@/app/merchant/wallet/convert/api/verify-merchant-simple-password";
import {tokenToDeposit} from "@/app/merchant/wallet/convert/api/token-to-deposit";
import AmountStep from "./components/AmountStep";
import ConfirmStep from "@/app/merchant/wallet/convert/components/ConfirmStep";
import VerifySimplePassword from "@/app/merchant/wallet/convert/components/VerifySimplePassword";
import ProcessingStep from "@/app/merchant/wallet/convert/components/ProcessingStep";
import CompleteStep from "@/app/merchant/wallet/convert/components/CompleteStep";
import LoadingOverlay from "@/components/common/LoadingOverlay";

export default function ConvertPage() {
    const router = useRouter();
    const params = useParams();
    const type = params.type as "token-to-deposit";

    const [step, setStep] = useState<"amount" | "confirm" | "password" | "processing" | "complete">("amount");
    const [amount, setAmount] = useState("");
    const [depositBalance, setDepositBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const title = "토큰 → 예금";

    useEffect(() => {
        fetchBalance()
    }, []);

    const fetchBalance = async () => {
        try {
            const data = await fetchMerchantWalletInfo();
            setDepositBalance(data.depositBalance);
            setTokenBalance(data.tokenBalance);
        } catch (err) {
            alert("지갑 정보를 불러오지 못했습니다.");
        }
    };

    const handleMax = () => {
        const max = tokenBalance;
        setAmount(String(max));
    };

    const handlePasswordComplete = async (simplePassword: string) => {
        const amountNum = Number(amount);
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 0));

        try {
            await tokenToDeposit(amountNum, simplePassword);
            await fetchBalance();

            setStep("processing");
            setTimeout(() => setStep("complete"), 5000);
        } catch (err: any) {
            alert(err.message);
            setStep("amount");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
            {isLoading && <LoadingOverlay message="요청 처리 중입니다..." />}

            <Header title={title} />
            <div className="flex-1 min-h-[calc(90vh-60px)]">
                {step === "amount" && (
                    <AmountStep
                        type={type}
                        amount={amount}
                        depositBalance={depositBalance}
                        tokenBalance={tokenBalance}
                        setAmount={setAmount}
                        onMax={handleMax}
                        onChange={setAmount}
                        onContinue={() => setStep("confirm")}
                    />
                )}

                {step === "confirm" && (
                    <ConfirmStep
                        type={type}
                        amount={amount}
                        depositBalance={depositBalance}
                        tokenBalance={tokenBalance}
                        onBack={() => setStep("amount")}
                        onConfirm={() => setStep("password")}
                    />
                )}

                {step === "password" && (
                    <div className="flex flex-col items-center justify-center h-full px-4 pt-10">
                        <img
                            src="/images/bunny-lock.png"
                            alt="간편 비밀번호 입력"
                            className="w-32 h-auto mb-6"
                        />
                        <VerifySimplePassword onVerified={handlePasswordComplete} />
                    </div>
                )}


                {step === "processing" && <ProcessingStep type={type} />}

                {step === "complete" && (
                    <CompleteStep
                        type={type}
                        amount={amount}
                        depositBalance={depositBalance}
                        tokenBalance={tokenBalance}
                        onBackToWallet={() => router.push("/merchant/wallet")}
                    />
                )}
            </div>
        </div>
    );
}

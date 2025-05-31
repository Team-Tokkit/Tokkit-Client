"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import { fetchMerchantWalletInfo } from "@/app/merchant/dashboard/api/merchant-wallet-info";
import { tokenToDeposit } from "@/app/merchant/wallet/convert/api/token-to-deposit";
import AmountStep from "./components/AmountStep";
import ConfirmStep from "@/app/merchant/wallet/convert/components/ConfirmStep";
import VerifySimplePassword from "@/app/merchant/wallet/convert/components/VerifySimplePassword";
import ProcessingStep from "@/app/merchant/wallet/convert/components/ProcessingStep";
import CompleteStep from "@/app/merchant/wallet/convert/components/CompleteStep";
import LoadingOverlay from "@/components/common/LoadingOverlay";
import ConvertSkeleton from "@/app/merchant/wallet/convert/components/ConvertSkeleton";

export default function ConvertPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as "token-to-deposit";

  const [step, setStep] = useState<"amount" | "confirm" | "password" | "processing" | "complete">("amount");
  const [amount, setAmount] = useState("");
  const [depositBalance, setDepositBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isFetching, setIsFetching] = useState(true); // 초기 잔액 로딩
  const [isProcessing, setIsProcessing] = useState(false); // 전환 처리 중

  const title = "토큰 → 예금";

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      setIsFetching(true);
      const data = await fetchMerchantWalletInfo();
      setDepositBalance(data.depositBalance);
      setTokenBalance(data.tokenBalance);
    } catch (err) {
      alert("지갑 정보를 불러오지 못했습니다.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleMax = () => {
    setAmount(String(tokenBalance));
  };

  const handlePasswordComplete = async (simplePassword: string) => {
    const amountNum = Number(amount);
    setIsProcessing(true);

    try {
      await tokenToDeposit(amountNum, simplePassword);
      await fetchBalance();
      setStep("processing");
      setTimeout(() => setStep("complete"), 5000);
    } catch (err: any) {
      alert(err.message);
      setStep("amount");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {isFetching ? (
        <ConvertSkeleton />
      ) : (
        <>
          {isProcessing && <LoadingOverlay message="요청 처리 중입니다..." />}

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
                onBackToWallet={() => router.push("/merchant/dashboard")}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import WalletHeader from "@/components/wallet/common/WalletHeader";
import AmountStep from "@/components/wallet/AmountStep";
import ConfirmStep from "@/components/wallet/ConfirmStep";
import PasswordStep from "@/components/wallet/PasswordStep";
import ProcessingStep from "@/components/wallet/ProcessingStep";
import CompleteStep from "@/components/wallet/CompleteStep";

export default function ConvertPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as "deposit-to-token" | "token-to-deposit";
  const isDepositToToken = type === "deposit-to-token";

  const [initialLoading, setInitialLoading] = useState(true);
  const [depositBalance, setDepositBalance] = useState(200000);
  const [tokenBalance, setTokenBalance] = useState(30000);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<
    "amount" | "confirm" | "password" | "processing" | "complete"
  >("amount");

  const title = type === "deposit-to-token" ? "토큰 → 예금" : "예금 → 토큰";

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleMaxAmount = () => {
    const max = isDepositToToken ? tokenBalance : depositBalance;
    setAmount(String(max));
  };

  const handleContinue = () => {
    const amountNum = Number.parseInt(amount);
    if (!amountNum || amountNum <= 0) {
      alert("전환할 금액을 입력해주세요.");
      return;
    }
    if (isDepositToToken && amountNum > tokenBalance) {
      alert("토큰 잔액을 초과할 수 없습니다.");
      return;
    } else if (!isDepositToToken && amountNum > depositBalance) {
      alert("예금 잔액을 초과할 수 없습니다.");
      return;
    }
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("password");
  };

  const handlePasswordComplete = async (password: string) => {
    setStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const amountNum = Number.parseInt(amount);
    const updatedDeposit = isDepositToToken
      ? depositBalance + amountNum
      : depositBalance - amountNum;
    const updatedToken = isDepositToToken
      ? tokenBalance - amountNum
      : tokenBalance + amountNum;

    setDepositBalance(updatedDeposit);
    setTokenBalance(updatedToken);
    setStep("complete");
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
        <img
          src="/images/loading-bunny.png"
          alt="로딩 중"
          className="w-28 h-24 md:w-48 md:h-36 mb-6 object-contain"
          />
        <p className="text-[#666666] text-sm">잠시만 기다려주세요...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <WalletHeader title={title} />
      {step === "amount" || step === "confirm" ? (
        <main className="flex-1 flex flex-col overflow-hidden">
        {step === "amount" && (
            <AmountStep
              type={type}
              amount={amount}
              depositBalance={depositBalance}
              tokenBalance={tokenBalance}
              onMax={handleMaxAmount}
              onChange={setAmount}
              onContinue={handleContinue}
            />
          )}
          {step === "confirm" && (
            <ConfirmStep
              type={type}
              amount={amount}
              depositBalance={depositBalance}
              tokenBalance={tokenBalance}
              onBack={() => setStep("amount")}
              onConfirm={handleConfirm}
            />
          )}
        </main>
      ) : (
        <main className="flex items-center justify-center flex-1 px-5">
          {step === "password" && (
            <PasswordStep onComplete={handlePasswordComplete} />
          )}
          {step === "processing" && <ProcessingStep type={type} />}
          {step === "complete" && (
            <CompleteStep
              type={type}
              amount={amount}
              depositBalance={depositBalance}
              tokenBalance={tokenBalance}
              onBackToWallet={() => router.push("/wallet")}
            />
          )}
        </main>
      )}
    </div>
  );
}

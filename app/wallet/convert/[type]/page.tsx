"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Header from "@/components/common/Header";
import AmountStep from "@/app/wallet/components/AmountStep";
import ConfirmStep from "@/app/wallet/components/ConfirmStep";
import PasswordStep from "@/components/common/SimplePassWord";
import ProcessingStep from "@/app/wallet/components/ProcessingStep";
import CompleteStep from "@/app/wallet/components/CompleteStep";

import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export default function ConvertPage() {
  const router = useRouter();
  const params = useParams();
  const type = params.type as "deposit-to-token" | "token-to-deposit";
  const isDepositToToken = type === "deposit-to-token";

  const [initialLoading, setInitialLoading] = useState(true);
  const [depositBalance, setDepositBalance] = useState<number | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<
    "amount" | "confirm" | "password" | "processing" | "complete"
  >("amount");

  const title = isDepositToToken ? "예금 → 토큰" : "토큰 → 예금";

  const fetchBalance = async () => {
    try {
      console.log("잔액 조회 시작...");
      const response = await fetch(`${API_URL}/api/wallet/balance?userId=1`);
      const data = await response.json();
      if (data.isSuccess) {
        setDepositBalance(data.result.depositBalance);
        setTokenBalance(data.result.tokenBalance);
        console.log("잔액 조회 성공:", data.result);
      } else {
        alert("잔액 조회 실패: " + data.message);
      }
    } catch (error) {
      console.error("잔액 조회 오류:", error);
      alert("잔액 조회 중 오류 발생");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
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
    if (isDepositToToken && amountNum > depositBalance!) {
      alert("예금 잔액을 초과할 수 없습니다.");
      return;
    } else if (!isDepositToToken && amountNum > tokenBalance!) {
      alert("토큰 잔액을 초과할 수 없습니다.");
      return;
    }
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("password");
  };

  const handlePasswordComplete = async (password: string) => {
    setStep("processing");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const amountNum = Number.parseInt(amount);
    const endpoint = isDepositToToken
      ? "/api/wallet/convert/deposit-to-token"
      : "/api/wallet/convert/token-to-deposit";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, amount: amountNum }),
      });

      const data = await response.json();

      if (data.isSuccess) {
        await fetchBalance();
        setStep("complete");
      } else {
        alert(data.message || "전환 실패");
        setStep("amount");
      }
    } catch {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      setStep("amount");
    }
  };

  if (initialLoading || depositBalance === null || tokenBalance === null) {
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
      <Header title={title} />
      {step === "amount" || step === "confirm" ? (
        <main className="flex-1 flex flex-col overflow-hidden">
          {step === "amount" && (
            <AmountStep
              type={type}
              amount={amount}
              setAmount={setAmount}
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

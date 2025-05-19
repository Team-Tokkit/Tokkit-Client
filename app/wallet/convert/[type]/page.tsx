"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/common/Header";
import AmountStep from "@/app/wallet/components/AmountStep"
import ConfirmStep from "@/app/wallet/components/ConfirmStep";
import ProcessingStep from "@/app/wallet/components/ProcessingStep";
import CompleteStep from "@/app/wallet/components/CompleteStep";
import VerifySimplePassword from "@/app/payment/components/VerifySimplePassword";
import { fetchWalletBalance, verifyPassword, convertBalance } from "@/app/wallet/api/wallet";

export default function ConvertPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "deposit-to-token" | "token-to-deposit") ?? "deposit-to-token";

  const [step, setStep] = useState<"amount" | "confirm" | "password" | "processing" | "complete">("amount");
  const [amount, setAmount] = useState("");
  const [depositBalance, setDepositBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const data = await fetchWalletBalance();
      setDepositBalance(data.depositBalance);
      setTokenBalance(data.tokenBalance);
    } catch (err) {
      alert("지갑 정보를 불러오지 못했습니다.");
    }
  };

  const handleMax = () => {
    const max = type === "deposit-to-token" ? depositBalance : tokenBalance;
    setAmount(String(max));
  };

  const handleAmountChange = (val: string) => {
    setAmount(val);
  };

  const handlePasswordComplete = async (simplePassword: string) => {
    const amountNum = Number(amount);
    try {
      await verifyPassword(simplePassword);
    } catch (err: any) {
      alert(err.message);
      setStep("password");
      return;
    }

    setStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await convertBalance(type, amountNum, simplePassword);
      await fetchBalance();
      setStep("complete");
    } catch (err: any) {
      alert(err.message);
      setStep("amount");
    }
  };

  return (
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
        <Header title="전환하기" />
        <div className="flex-1 min-h-[calc(90vh-60px)]">
          {step === "amount" && (
              <AmountStep
                  type={type}
                  amount={amount}
                  depositBalance={depositBalance}
                  tokenBalance={tokenBalance}
                  setAmount={setAmount}
                  onMax={handleMax}
                  onChange={handleAmountChange}
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
              <VerifySimplePassword onVerified={handlePasswordComplete} />
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
        </div>
      </div>
  );
}

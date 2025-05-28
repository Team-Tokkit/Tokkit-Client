"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { myVouchers, Voucher } from "@/app/merchant/mypage/qr-code/data/payment";
import confetti from "canvas-confetti";

import Header from "@/components/common/Header";
import QRScanBox from "@/app/payment/components/QRScanBox";
import ManualBox from "@/app/payment/components/ManualBox";
import PaymentCarousel from "@/app/payment/components/PaymentCarousel";
import MerchantInfoCard from "@/app/payment/components/MerchantInfoCard";
import AmountBox from "@/app/payment/components/AmountBox";
import ResultBox from "@/app/payment/components/ResultBox";
import {
  verifySimplePassword,
  submitVoucherPayment,
  submitTokenPayment,
  getPaymentOptions,
  fetchStoreInfo,
  StoreInfoResponse,
} from "@/app/payment/api/payment";
import VerifySimplePassword from "@/app/payment/components/VerifySimplePassword";
import LoadingOverlay from "@/components/common/LoadingOverlay";

export default function PaymentPage() {
  const router = useRouter();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showScanner, setShowScanner] = useState(true);
  const [paymentStep, setPaymentStep] = useState<
    "scan" | "amount" | "manual" | "password" | "result"
  >("scan");
  const [transactionId, setTransactionId] = useState("");
  const [merchantInfo, setMerchantInfo] = useState<StoreInfoResponse | null>(null);
  const [usableVouchers, setUsableVouchers] = useState<Voucher[]>(myVouchers);
  const [scannerKey, setScannerKey] = useState(0);
  const [scanLocked, setScanLocked] = useState(false);
  const [done, setDone] = useState(false);

  const [voucherOwnershipId, setVoucherOwnershipId] = useState("");
  const [merchantId, setMerchantId] = useState<number>(0);
  const [storeId, setStoreId] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [simplePassword, setSimplePassword] = useState("");

  const [isProcessing, setIsProcessing] = useState(false); // 결제 요청 중
  const [isLoading, setIsLoading] = useState(false); // 매장 정보 등 로딩 중

  useEffect(() => {
    setPaymentAmount("");
  }, [carouselIndex]);

  useEffect(() => {
    if (paymentStep === "result") {
      setDone(false);
      const timer = setTimeout(() => {
        setDone(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [paymentStep]);

  useEffect(() => {
    if (!done) return;

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 450);

    return () => clearInterval(interval);
  }, [done]);

  function parseTransactionId(txId: string): { merchantId: number, storeId: number } | null {
    const match = txId.match(/^m(\d+)s(\d+)$/);
    if (!match) return null;
    const [, merchantId, storeId] = match;
    return { merchantId: Number(merchantId), storeId: Number(storeId) };
  }

  const handleScanComplete = async (data: string) => {
    if (scanLocked || isLoading) return;
    setScanLocked(true);
    setIsLoading(true);

    try {
      const parsed = parseTransactionId(data);
      if (!parsed) throw new Error("QR 형식 오류");

      const { merchantId, storeId } = parsed;

      const storeInfo: StoreInfoResponse = await fetchStoreInfo(storeId, merchantId);
      setMerchantInfo(storeInfo);
      setMerchantId(merchantId);
      setStoreId(storeId);
      setTransactionId(data);

      const options = await getPaymentOptions(storeId);
      const mapped = options.map((opt) => ({
        id: opt.type === "TOKEN" ? "token" : String(opt.voucherOwnershipId),
        title: opt.name,
        balance: opt.balance,
        expiryDate: opt.expireDate,
        icon: opt.type === "TOKEN" ? "🪙" : "🎟️",
        disabled: !opt.usable,
      }));

      setUsableVouchers(mapped);

      setTimeout(() => {
        setPaymentStep("amount");
        setIsLoading(false);
        setScanLocked(false);
      }, 800);
    } catch (err) {
      console.error("QR 인식 실패:", err);
      alert("QR 코드가 잘못되었거나 해당 매장을 찾을 수 없습니다.");
      setShowScanner(false);
      setTimeout(() => {
        setScannerKey((prev) => prev + 1);
        setShowScanner(true);
        setScanLocked(false);
        setIsLoading(false);
      }, 600);
    }
  };

  const handleManualEntry = () => {
    setPaymentStep("manual");
  };

  const handleCancel = () => {
    setPaymentStep("scan");
    setPaymentAmount("");
    setTransactionId("");
    setMerchantInfo(null);
    setCarouselIndex(0);
    setShowScanner(true);
  };

  const handleSubmitTransaction = async (input: string) => {
    if (isLoading) return;
    const trimmed = input.trim();
    const parsed = parseTransactionId(trimmed);
    if (!parsed) {
      alert("거래번호 형식이 잘못되었습니다.");
      return;
    }

    try {
      setIsLoading(true);
      const { merchantId, storeId } = parsed;
      const storeInfo = await fetchStoreInfo(storeId, merchantId);
      setMerchantInfo(storeInfo);
      setMerchantId(merchantId);
      setStoreId(storeId);
      setTransactionId(trimmed);

      const options = await getPaymentOptions(storeId);
      const mapped = options.map((opt) => ({
        id: opt.type === "TOKEN" ? "token" : String(opt.voucherOwnershipId),
        title: opt.name,
        balance: opt.balance,
        expiryDate: opt.expireDate,
        icon: opt.type === "TOKEN" ? "🪙" : "🎟️",
        disabled: !opt.usable,
      }));

      setUsableVouchers(mapped);

      setTimeout(() => {
        setPaymentStep("amount");
        setIsLoading(false);
      }, 800);
    } catch (err) {
      console.error("거래번호 인식 실패:", err);
      alert("유효하지 않은 거래번호입니다.");
      setIsLoading(false);
    }
  };

  const handlePayment = async (verifiedPassword: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const idempotencyKey = crypto.randomUUID();

    const amount = Number(paymentAmount);
    const selectedVoucher = usableVouchers[carouselIndex];
    const isToken = selectedVoucher.id === "token";

    try {
      const response = isToken
        ? await submitTokenPayment(
            Number(merchantId),
            amount,
            verifiedPassword,
            idempotencyKey
          )
        : await submitVoucherPayment(
            Number(selectedVoucher.id),
            Number(merchantId),
            Number(storeId),
            amount,
            verifiedPassword,
            idempotencyKey
          );

      if (!response.isSuccess) {
        console.error("결제에 실패했습니다.", response);
        alert(response.message || "결제에 실패했습니다.");
        return;
      }

      setPaymentStep("result");
    } catch (e) {
      console.error("결제 요청 오류:", e);
      alert("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentComplete = () => {
    router.push("/dashboard");
  };

  const currentBalance =
    usableVouchers.length > 0 ? usableVouchers[carouselIndex].balance : 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {(isProcessing || isLoading) && (
        <LoadingOverlay message={isProcessing ? "결제 요청 중입니다..." : " QR 인식 중입니다. 잠시만 기다려주세요..."} />
      )}
      <Header title="결제하기" />
      <div className="flex-1 min-h-[calc(90vh-60px)] overflow-visible p-4">
        <AnimatePresence mode="wait">
          {paymentStep === "scan" && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-start min-h-[calc(100vh-60px)] pt-[8vh] pb-6 px-4 space-y-4"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm w-full max-w-md">
                <QRScanBox
                  key={scannerKey}
                  onScan={handleScanComplete}
                  scannerEnabled={true}
                />
              </div>

              <Button
                onClick={handleManualEntry}
                className="w-full max-w-md text-sm text-[#FF9500] bg-white hover:bg-[#FF9500] hover:text-white transition-colors py-7 rounded-2xl"
              >
                QR 코드 인식이 안되나요?
              </Button>
            </motion.div>
          )}

          {paymentStep === "manual" && (
            <motion.div
              key="manual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-start min-h-[calc(100vh-60px)] px-4 mt-[6vh]"
            >
              <ManualBox
                onSubmit={handleSubmitTransaction}
                onCancel={handleCancel}
              />
            </motion.div>
          )}

          {paymentStep === "amount" && merchantInfo && (
            <motion.div
              key="amount"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-start min-h-[calc(100vh-60px)] px-4 pb-4 space-y-4"
            >
              <div className="w-full max-w-md">
                {merchantInfo && (
                  <MerchantInfoCard
                    name={merchantInfo.merchantName}
                    address={merchantInfo.address}
                  />
                )}
              </div>

              <div className="w-full max-w-md">
                <AmountBox
                  amount={paymentAmount}
                  setAmount={setPaymentAmount}
                  currentBalance={currentBalance}
                  selectedVoucher={usableVouchers[carouselIndex]}
                  onCancel={handleCancel}
                  onSubmit={() => setPaymentStep("password")}
                >
                  <div className="mb-4 overflow-visible">
                    <PaymentCarousel
                      vouchers={usableVouchers}
                      currentIndex={carouselIndex}
                      selectedIndex={carouselIndex}
                      onScrollIndexChange={setCarouselIndex}
                      onSelect={setCarouselIndex}
                    />
                  </div>
                </AmountBox>
              </div>
            </motion.div>
          )}

          {paymentStep === "password" && (
            <motion.div
              key="password"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4"
            >
              <VerifySimplePassword
                disabled={isProcessing}
                onVerified={(password) => {
                  handlePayment(password);
                }}
              />
            </motion.div>
          )}

          {paymentStep === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4"
            >
              {!done ? (
                <motion.div
                  key="spinner"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 540 }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  onAnimationComplete={() => setDone(true)}
                  className="mb-6"
                >
                  <LoaderCircle className="h-16 w-16 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mb-6"
                >
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </motion.div>
              )}

              <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 text-center">
                결제 완료
              </h2>
              <p className="text-[#666666] mb-8 text-center">
                결제가 성공적으로 완료되었습니다.
              </p>

              {(() => {
                const selected = usableVouchers[carouselIndex];
                const numericAmount = Number(
                  paymentAmount.replace(/,/g, "") || "0"
                );

                const adjustedVoucher = {
                  ...selected,
                  balance: selected.balance - numericAmount,
                  icon: selected.icon || "",
                };

                return (
                  <ResultBox
                    paymentAmount={paymentAmount}
                    storeQRInfo={merchantInfo}
                    selectedVoucher={adjustedVoucher}
                  />
                );
              })()}

              <Button
                className="w-full max-w-xs h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md mt-2"
                onClick={handlePaymentComplete}
              >
                확인
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
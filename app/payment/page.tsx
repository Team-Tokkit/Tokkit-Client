"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { myVouchers } from "@/data/payment/payment";
import { mockStoreQR, StoreQRInfo } from "@/data/payment/storeqr";
import confetti from "canvas-confetti";

import Header from "@/components/common/Header";
import QRScanBox from "@/app/payment/components/QRScanBox";
import ManualBox from "@/app/payment/components/ManualBox";
import PaymentCarousel from "@/app/payment/components/PaymentCarousel";
import MerchantInfoCard from "@/app/payment/components/MerchantInfoCard";
import AmountBox from "@/app/payment/components/AmountBox";
import ResultBox from "@/app/payment/components/ResultBox";

export default function PaymentPage() {
  const router = useRouter();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showScanner, setShowScanner] = useState(true);
  const [paymentStep, setPaymentStep] = useState<
    "scan" | "amount" | "manual" | "result"
  >("scan");
  const [transactionId, setTransactionId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [merchantInfo, setMerchantInfo] = useState<StoreQRInfo | null>(null);
  const [usableVouchers, setUsableVouchers] = useState(myVouchers);
  const [scannerKey, setScannerKey] = useState(0);
  const [scanLocked, setScanLocked] = useState(false);
  const [done, setDone] = useState(false);

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

  const handleScanComplete = (data: string) => {
    if (scanLocked) return;
    setScanLocked(true);

    try {
      const parsed = JSON.parse(data);
      const { transactionId } = parsed;

      const merchant = Object.values(mockStoreQR).find(
        (store) => store.transactionId === transactionId
      );

      if (merchant) {
        setMerchantInfo(merchant);
        setTransactionId(transactionId);

        const allowedIds = merchant.supportedVouchers || [];
        const usable = myVouchers.filter((v) => allowedIds.includes(v.id));
        setUsableVouchers(usable);

        setTimeout(() => {
          setPaymentStep("amount");
          setScanLocked(false);
        }, 300);
      } else {
        setShowScanner(false);
        setTimeout(() => {
          alert("해당 거래번호로 매장을 찾을 수 없습니다.");
          setScannerKey((prev) => prev + 1);
          setShowScanner(true);
          setScanLocked(false);
        }, 600);
      }
    } catch {
      setShowScanner(false);
      setTimeout(() => {
        alert("QR 코드 형식이 잘못되었습니다.");
        setScannerKey((prev) => prev + 1);
        setShowScanner(true);
        setScanLocked(false);
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

  const handleSubmitTransaction = (input: string) => {
    const trimmed = input.trim();

    const merchant = Object.values(mockStoreQR).find(
      (store) => store.transactionId === trimmed
    );

    if (merchant) {
      setMerchantInfo(merchant);
      setTransactionId(trimmed);

      const allowedIds = merchant.supportedVouchers || [];
      const usable = myVouchers.filter((v) => allowedIds.includes(v.id));
      setUsableVouchers(usable);

      setPaymentStep("amount");
    } else {
      alert("유효하지 않은 거래번호입니다.");
    }
  };

  const handlePaymentComplete = () => {
    router.push("/dashboard");
  };

  const currentBalance =
    usableVouchers.length > 0 ? usableVouchers[carouselIndex].balance : 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <Header title="결제하기" />
      <div className="flex-1 min-h-[calc(90vh-60px)] overflow-hidden p-4">
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
                  <MerchantInfoCard
                    name={merchantInfo.merchantName}
                    address={merchantInfo.address}
                    logoUrl={merchantInfo.logoUrl}
                  />
              </div>

              <div className="w-full max-w-md">
                <AmountBox
                  amount={paymentAmount}
                  setAmount={setPaymentAmount}
                  currentBalance={currentBalance}
                  selectedVoucher={usableVouchers[carouselIndex]}
                  onCancel={handleCancel}
                  onSubmit={() => setPaymentStep("result")}
                >
                  <div className="mb-4">
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

              <ResultBox
                paymentAmount={paymentAmount}
                storeQRInfo={merchantInfo}
                selectedVoucher={myVouchers[carouselIndex]}
              />

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

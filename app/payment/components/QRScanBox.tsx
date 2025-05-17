"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const QRScanner = dynamic(() => import("@/components/qr-scanner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <p className="text-white">카메라 로딩 중...</p>
    </div>
  ),
});

interface QRScanBoxProps {
  onScan: (value: string) => void;
  scannerEnabled: boolean;
}

export default function QRScanBox({ onScan }: QRScanBoxProps) {
  useEffect(() => {
    const video = document.querySelector("video");
    return () => {
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-[#1A1A1A]">QR 코드 스캔</h3>
      <p className="text-sm text-[#666666] mb-4">
        가맹점 QR 코드를 스캔해주세요.
      </p>

      <div className="relative bg-black rounded-xl overflow-hidden mb-4 aspect-square">
        <div className="w-full h-full flex items-center justify-center">
          <QRScanner onScan={onScan} />
        </div>

        <div className="absolute inset-0 rounded-xl pointer-events-none" />
      </div>
    </div>
  );
}

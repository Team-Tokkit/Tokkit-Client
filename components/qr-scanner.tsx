"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScan: (data: string) => void;
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
}

export default function QRScanner({
  onScan,
  fps = 10,
  qrbox = 250,
  aspectRatio = 1.0,
}: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const scannerId = `qr-scanner-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    const container = document.createElement("div");
    container.id = scannerId;
    container.style.width = "100%";
    container.style.height = "100%";

    const parentElement = document.getElementById("scanner-wrapper");
    if (parentElement) {
      parentElement.appendChild(container);
    } else {
      console.error("스캐너 래퍼 요소를 찾을 수 없습니다.");
      return;
    }

    try {
      scannerRef.current = new Html5Qrcode(scannerId);

      const startScanning = async () => {
        try {
          if (scannerRef.current) {
            await scannerRef.current.start(
              { facingMode: "environment" },
              {
                fps,
                qrbox: { width: qrbox, height: qrbox },
                aspectRatio,
              },
              (decodedText) => {
                onScan(decodedText);
                try {
                  if (scannerRef.current && hasStartedRef.current) {
                    scannerRef.current.stop().catch(() => {});
                  }
                } catch (e) {}
                setIsScanning(false);
                hasStartedRef.current = false;
              },
              () => {}
            );
            setIsScanning(true);
            hasStartedRef.current = true;
          }
        } catch (err) {
          console.error("QR 스캐너 시작 오류:", err);
          setIsScanning(false);
          hasStartedRef.current = false;
        }
      };

      startScanning();
    } catch (err) {
      console.error("QR 스캐너 초기화 오류:", err);
    }

    return () => {
      try {
        const video = document.querySelector("video");
        if (video && typeof video.pause === "function") {
          video.pause();
        }
        
        if (scannerRef.current && hasStartedRef.current) {
          scannerRef.current
            .stop()
            .catch(() => {})
            .finally(() => {
              scannerRef.current = null;
              hasStartedRef.current = false;
            });
        }

        if (parentElement && parentElement.contains(container)) {
          parentElement.removeChild(container);
        }
      } catch (e) {
        console.error("스캐너 정리 중 오류 발생 (무시됨):", e);
      }
    };
  }, [fps, qrbox, aspectRatio, onScan]);

  return <div id="scanner-wrapper" className="w-full h-full"></div>;
}

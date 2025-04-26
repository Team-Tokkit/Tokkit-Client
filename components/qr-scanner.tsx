"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QRScannerProps {
  onScan: (data: string) => void
  fps?: number
  qrbox?: number
  aspectRatio?: number
}

export default function QRScanner({ onScan, fps = 10, qrbox = 250, aspectRatio = 1.0 }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    // 고유한 ID 생성 (여러 스캐너 인스턴스 충돌 방지)
    const scannerId = `qr-scanner-${Math.random().toString(36).substring(2, 9)}`

    // 스캐너 컨테이너 생성
    const container = document.createElement("div")
    container.id = scannerId
    container.style.width = "100%"
    container.style.height = "100%"

    // 현재 컴포넌트의 DOM에 컨테이너 추가
    const parentElement = document.getElementById("scanner-wrapper")
    if (parentElement) {
      parentElement.appendChild(container)
    } else {
      console.error("스캐너 래퍼 요소를 찾을 수 없습니다.")
      return
    }

    try {
      // 스캐너 인스턴스 생성
      scannerRef.current = new Html5Qrcode(scannerId)

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
                onScan(decodedText)
                // 스캔 성공 시 스캐너 중지 시도 (오류 무시)
                try {
                  if (scannerRef.current && hasStartedRef.current) {
                    scannerRef.current.stop().catch(() => {
                      // 오류 무시
                    })
                  }
                } catch (e) {
                  // 오류 무시
                }
                setIsScanning(false)
                hasStartedRef.current = false
              },
              () => {
                // 에러는 무시 (지속적으로 스캔 시도)
              },
            )
            setIsScanning(true)
            hasStartedRef.current = true
          }
        } catch (err) {
          console.error("QR 스캐너 시작 오류:", err)
          setIsScanning(false)
          hasStartedRef.current = false
        }
      }

      startScanning()
    } catch (err) {
      console.error("QR 스캐너 초기화 오류:", err)
    }

    // 컴포넌트가 언마운트될 때 스캐너 정리
    return () => {
      try {
        // 스캐너가 실행 중인 경우에만 중지 시도
        if (scannerRef.current && hasStartedRef.current) {
          scannerRef.current
            .stop()
            .catch(() => {
              // 오류 무시
            })
            .finally(() => {
              scannerRef.current = null
              hasStartedRef.current = false
            })
        }

        // DOM에서 컨테이너 제거
        if (parentElement && parentElement.contains(container)) {
          parentElement.removeChild(container)
        }
      } catch (e) {
        // 오류 무시
        console.error("스캐너 정리 중 오류 발생 (무시됨):", e)
      }
    }
  }, [fps, qrbox, aspectRatio, onScan])

  return (
    <div id="scanner-wrapper" className="w-full h-full">
      {/* 스캐너 컨테이너는 동적으로 생성됩니다 */}
    </div>
  )
}

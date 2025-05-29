"use client"

import { useEffect, useRef } from "react"
import QRCodeLib from "qrcode"

interface QRCodeProps {
  value: string
  size?: number
  level?: "L" | "M" | "Q" | "H"
  includeMargin?: boolean
  color?: string
  backgroundColor?: string
}

export default function QRCode({
  value,
  size = 200,
  level = "M",
  includeMargin = true,
  color = "#000000",
  backgroundColor = "#ffffff",
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: includeMargin ? 4 : 0,
          errorCorrectionLevel: level,
          color: {
             color,
            light: backgroundColor,
          },
        },
        (error) => {
          if (error) console.error("QR 코드 생성 오류:", error)
        },
      )
    }
  }, [value, size, level, includeMargin, color, backgroundColor])

  return <canvas ref={canvasRef} />
}

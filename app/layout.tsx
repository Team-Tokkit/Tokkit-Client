import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "./MainLayout"
import {SseProvider} from "@/components/common/SseProvider";

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Tokkit - 스마트한 금융의 시작",
  description: "Tokkit과 함께 더 스마트하고 안전한 금융 서비스를 경험하세요",
  generator: 'v0.dev'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className={nunito.className}>
        <ThemeProvider attribute="class"  >
          <SseProvider>
            <MainLayout>{children}</MainLayout>
          </SseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

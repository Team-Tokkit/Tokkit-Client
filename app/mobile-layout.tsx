"use client"

import type React from "react"
import { usePathname } from "next/navigation"

interface MobileLayoutProps {
  children: React.ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname()

  // admin 경로는 모바일 레이아웃을 적용하지 않음
  if (pathname.startsWith("/admin")) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] flex justify-center">
      <div className="w-full max-w-md mx-auto">{children}</div>
    </div>
  )
}

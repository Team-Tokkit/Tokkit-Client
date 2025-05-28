"use client";

import type React from "react"
import { usePathname } from "next/navigation"

// 클라이언트 컴포넌트
export function MainLayout({ children }: { children: React.ReactNode }) {
  "use client"

  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  return <div className={isAdmin ? "w-full" : "max-w-md mx-auto"}>{children}</div>
}
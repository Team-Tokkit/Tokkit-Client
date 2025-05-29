"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href?: string
}

export function BackButton({ href = "/" }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push(href)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[#1A1A1A] "
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </Button>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function VoucherHeader({ title }: { title: string }) {
  const router = useRouter()

  return (
    <header className="bg-white p-5 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </header>
  )
}

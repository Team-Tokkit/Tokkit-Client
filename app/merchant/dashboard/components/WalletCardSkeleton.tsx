import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WalletCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFBA2D] to-[#FF9500] shadow-xl mx-2">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl" />
      <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl" />

      <div className="relative z-10 p-6">
        <div className="flex items-center mb-5">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 shadow-md">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="h-4 w-24 bg-white/30 rounded mb-1 animate-pulse"></div>
            <div className="h-3 w-32 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div className="min-w-0">
            <p className="text-xs text-white/80 font-light">토큰 잔액</p>
            <div className="flex items-baseline mt-1">
              <div className="h-8 w-32 bg-white/30 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              className="bg-white text-[#FF9500] hover:bg-white/90 rounded-lg text-xs px-4 py-1 h-9 shadow-md font-medium cursor-default"
              disabled
            >
              예금 전환
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

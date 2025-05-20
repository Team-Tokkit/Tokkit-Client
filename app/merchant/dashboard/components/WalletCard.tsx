"use client"

import { Wallet, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface WalletCardProps {
    storeName: string
    accountNumber: string
    tokenBalance: number
    depositBalance: number
    isLoading: boolean
    onManageClick: () => void
    onConvertClick: () => void
}

export function WalletCard({
                               storeName,
                               accountNumber,
                               tokenBalance,
                               depositBalance,
                               isLoading,
                               onManageClick,
                               onConvertClick,
                           }: WalletCardProps) {
    return (
        <div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFBA2D] to-[#FF9500] shadow-xl mx-2 cursor-pointer"
            onClick={onManageClick}
        >
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>

            <div className="relative z-10 p-6">
                <div className="flex items-center mb-5">
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 shadow-md">
                        <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white tracking-wide">{storeName}</p>
                        <p className="text-xs text-white/80 font-light tracking-wide">{accountNumber}</p>
                    </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-white/80 font-light tracking-wide">총 잔액</p>
                        <div className="flex items-baseline mt-1">
                            <p className="text-3xl font-bold text-white tracking-tight">
                                {isLoading ? "-" : (tokenBalance + depositBalance).toLocaleString()}
                            </p>
                            <p className="ml-1 text-lg text-white/90 tracking-wide">원</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            className="bg-white text-[#FF9500] hover:bg-white/90 rounded-lg text-xs px-4 py-1 h-9 shadow-md font-medium"
                            onClick={(e) => {
                                e.stopPropagation()
                                onConvertClick()
                            }}
                        >
                            예금 전환
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

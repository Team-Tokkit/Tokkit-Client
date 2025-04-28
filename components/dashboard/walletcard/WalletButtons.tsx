"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WalletButtons() {
    const router = useRouter();

    return (
        <div className="flex gap-2">
            <Button size="sm" className="bg-white/20 text-white hover:bg-white/30 rounded-lg text-xs px-4 py-1 h-9 shadow-sm" onClick={(e) => { e.stopPropagation(); router.push("/wallet/convert-to-token"); }}>
                토큰 충전
            </Button>
            <Button size="sm" className="bg-white text-[#FFB020] hover:bg-white/90 rounded-lg text-xs px-4 py-1 h-9 shadow-md font-medium" onClick={(e) => { e.stopPropagation(); router.push("/wallet/convert-to-deposit"); }}>
                예금 전환
            </Button>
        </div>
    );
}
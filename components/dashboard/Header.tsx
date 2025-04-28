"use client"

import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between mb-6 px-2">
            <Button variant="ghost" size="icon" className="rounded-full text-[#666666] h-10 w-10 hover:bg-[#FFD485]/20" onClick={() => router.push("/notifications")}>
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <div className="relative h-10 w-32">
                <Image src="/images/tokkit-logo.png" alt="Tokkit Logo" fill className="object-contain" priority />
            </div>

            <Button variant="ghost" size="icon" className="rounded-full text-[#666666] h-10 w-10 hover:bg-[#FFD485]/20" onClick={() => router.push("/mypage")}>
                <User className="h-5 w-5" />
            </Button>
        </div>
    )
}

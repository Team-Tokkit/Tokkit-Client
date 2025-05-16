"use client"

import {  AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recommendedVouchers } from "@/data/dashboard/recommendedVouchers";
import VoucherCard from "./VoucherCard";
import { useRouter } from "next/navigation";

export default function RecommendedVouchersSection() {
    const [currentVoucher, setCurrentVoucher] = useState(0);
    const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
        autoSlideTimerRef.current = setInterval(() => {
            setCurrentVoucher((prev) => (prev + 1) % recommendedVouchers.length);
        }, 5000);

        return () => {
            if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
        };
    }, []);

    const handleVoucherChange = (index: number) => {
        setCurrentVoucher(index);
        if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
        autoSlideTimerRef.current = setInterval(() => {
            setCurrentVoucher((prev) => (prev + 1) % recommendedVouchers.length);
        }, 5000);
    };

    return (
        <div className="mb-8 px-2">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-[#1A1A1A] flex items-center">
                    <span className="mr-2">✨</span> 맞춤 추천 바우처
                </h3>
                <Button variant="ghost" size="sm" className="text-xs text-[#666666] p-0 h-auto" onClick={() => router.push("/vouchers")}
                >
                    전체보기 <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
            </div>

            <div className="relative overflow-hidden h-[320px]">
                <AnimatePresence mode="wait">
                    {recommendedVouchers.map((voucher, index) =>
                            index === currentVoucher && (
                                <VoucherCard key={voucher.title} voucher={voucher} index={index} />
                            )
                    )}
                </AnimatePresence>
                <div className="flex justify-center gap-2 mt-6">
                    {recommendedVouchers.map((_, index) => (
                        <button key={index} onClick={() => handleVoucherChange(index)} className={`h-2 rounded-full transition-all duration-300 ${currentVoucher === index ? "w-8 bg-white" : "w-2 bg-white/50"}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Voucher } from "@/app/merchant/mypage/qr-code/data/payment";

interface PaymentCarouselProps {
    vouchers: Voucher[];
    currentIndex: number;
    selectedIndex: number | null;
    onScrollIndexChange: (index: number) => void;
    onSelect: (index: number) => void;
}

const CARD_WIDTH_PX = 240;
const CARD_MARGIN = 8;

export default function PaymentCarousel({
                                            vouchers,
                                            currentIndex,
                                            selectedIndex,
                                            onScrollIndexChange,
                                            onSelect,
                                        }: PaymentCarouselProps) {
    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % vouchers.length;
        onScrollIndexChange(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = currentIndex === 0 ? vouchers.length - 1 : currentIndex - 1;
        onScrollIndexChange(prevIndex);
    };

    return (
        <div className="relative w-full flex flex-col items-center">
            <h3 className="text-lg font-bold mb-6 text-[#1A1A1A] w-full text-left">
                결제 수단 선택
            </h3>

            {/* 좌우 화살표 */}
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-1 shadow-md -translate-x-1/2"
            >
                <ChevronLeft className="h-5 w-5 text-[#1A1A1A]" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-1 shadow-md translate-x-1/2"
            >
                <ChevronRight className="h-5 w-5 text-[#1A1A1A]" />
            </button>

            {/* 카드 영역 */}
            <div className="relative w-full px-4 overflow-x-visible"> {/* 💡 중요: overflow-x-visible */}
                <div className="relative rounded-2xl bg-white px-4 py-6 overflow-x-hidden"> {/* 💡 overflow-hidden 제거 */}

                    <div
                        className="relative z-20 w-full flex items-center justify-center -mt-5"
                        style={{
                            paddingLeft: `calc(50% - ${(CARD_WIDTH_PX / 2) + CARD_MARGIN}px)`, // 💡 마진 고려한 중앙정렬
                        }}
                    >
                        <motion.div
                            className="flex"
                            animate={{
                                x: `-${currentIndex * (CARD_WIDTH_PX + CARD_MARGIN * 2)}px`,
                            }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            style={{ width: "fit-content" }}
                        >
                            {vouchers.map((voucher, index) => {
                                const isActive = currentIndex === index;

                                return (
                                    <div
                                        key={voucher.id}
                                        style={{
                                            width: `${CARD_WIDTH_PX}px`,
                                            margin: `0 ${CARD_MARGIN}px`,
                                        }}
                                        className="flex-shrink-0"
                                        onClick={() => !voucher.disabled && onSelect(index)}
                                    >
                                        <motion.div
                                            layout
                                            initial={false}
                                            animate={{
                                                scale: isActive ? 1.01 : 1,
                                                backgroundColor: isActive ? "#FFFDF0" : "#FFFFFF",
                                                borderColor: isActive ? "#FFB020" : "#E5E7EB",
                                                boxShadow: isActive
                                                    ? "0 4px 12px rgba(0, 0, 0, 0.08)"
                                                    : "0 1px 3px rgba(0, 0, 0, 0.04)",
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className={`w-full h-full p-3 rounded-xl border transition-all duration-300 ease-in-out ${
                                                voucher.disabled ? "brightness-50 pointer-events-none" : ""
                                            }`}
                                        >
                                            <div className="flex items-center mb-3">
                                                <span className="text-xl mr-2">{voucher.icon}</span>
                                                <h4 className="font-medium text-[#1A1A1A] text-base">
                                                    {voucher.title}
                                                </h4>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-xs text-gray-500">잔액</p>
                                                    <p className="font-bold text-base text-[#1A1A1A]">
                                                        {voucher.balance.toLocaleString()}원
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">만료일</p>
                                                    <p className="text-sm text-[#1A1A1A]">{voucher.expiryDate}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 인디케이터 */}
            <div className="flex justify-center gap-2 mt-4">
                {vouchers.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            currentIndex === index ? "w-6 bg-[#FFB020]" : "w-2 bg-gray-300"
                        }`}
                        onClick={() => onScrollIndexChange(index)}
                    />
                ))}
            </div>
        </div>
    );
}

"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Voucher {
    title: string;
    description: string;
    deadline: string;
    amount: string;
    image: string;
    department: string;
}

export default function VoucherCard({ voucher, index }: { voucher: Voucher; index: number }) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl p-6 shadow-sm h-[280px] relative overflow-hidden cursor-pointer"
            onClick={() => router.push(`/vouchers/${index + 1}`)}
        >
            <div className="absolute inset-0 z-0">
                <Image src={voucher.image || "/placeholder.svg"} alt={voucher.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            </div>
            <div className="flex flex-col justify-between h-full relative z-20">
                <div>
                    <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/80">{voucher.department}</span>
                    <h4 className="text-2xl font-bold text-white mt-4 mb-2 drop-shadow-md">{voucher.title}</h4>
                    <p className="text-base text-white/90 mb-4 line-clamp-2 drop-shadow-md">{voucher.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center mb-4">
                        <Clock className="h-4 w-4 text-white/80 mr-2" />
                        <span className="text-sm text-white/80">신청마감: {voucher.deadline}</span>
                    </div>
                    <Button
                        className="rounded-lg px-5 py-2 text-white shadow-md text-sm h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/vouchers/apply/${index + 1}`);
                        }}
                    >
                        신청하기
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

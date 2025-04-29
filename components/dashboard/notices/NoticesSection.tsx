"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notices } from "@/data/dashboard/notices";
import NoticeCard from "./NoticeCard";
import { useRouter } from "next/navigation";

export default function NoticesSection() {
    const [currentNotice, setCurrentNotice] = useState(0);
    const noticeSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
        noticeSlideTimerRef.current = setInterval(() => {
            setCurrentNotice((prev) => (prev + 1) % notices.length);
        }, 4000);

        return () => {
            if (noticeSlideTimerRef.current) clearInterval(noticeSlideTimerRef.current);
        };
    }, []);

    const handleNoticeChange = (index: number) => {
        setCurrentNotice(index);
        if (noticeSlideTimerRef.current) clearInterval(noticeSlideTimerRef.current);
        noticeSlideTimerRef.current = setInterval(() => {
            setCurrentNotice((prev) => (prev + 1) % notices.length);
        }, 4000);
    };

    return (
        <div className="mb-10 px-2">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-[#1A1A1A] flex items-center">
                    <span className="mr-2">📢</span> 공지사항
                </h3>
                <Button variant="ghost" size="sm" className="text-xs text-[#666666] p-0 h-auto" onClick={() => router.push("/notices")}>
                    전체보기 <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
            </div>

            <motion.div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-[120px]">
                    <AnimatePresence mode="wait">
                        {notices.map((notice, index) =>
                                index === currentNotice && (
                                    <NoticeCard key={notice.id} notice={notice} />
                                )
                        )}
                    </AnimatePresence>

                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                        {notices.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleNoticeChange(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${currentNotice === index ? "w-6 bg-[#FFB020]" : "w-1.5 bg-[#E0E0E0]"}`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
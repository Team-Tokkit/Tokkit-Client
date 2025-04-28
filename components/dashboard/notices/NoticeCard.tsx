"use client"

import { motion } from "framer-motion";
import { Gift, Megaphone } from "lucide-react";
import { useRouter } from "next/navigation";

interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    isEvent: boolean;
    isNew: boolean;
}

export default function NoticeCard({ notice }: { notice: Notice }) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 cursor-pointer"
            onClick={() => router.push(`/notices/${notice.id}`)}
        >
            <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full ${notice.isEvent ? "bg-[#FF4A4A]/10" : "bg-[#4F6EF7]/10"} flex items-center justify-center mr-3`}>
                    {notice.isEvent ? <Gift className="h-4 w-4 text-[#FF4A4A]" /> : <Megaphone className="h-4 w-4 text-[#4F6EF7]" />}
                </div>
                <div className="flex-1">
                    <h4 className="text-base font-medium text-[#1A1A1A]">{notice.title}</h4>
                    <p className="text-xs text-[#999999]">{notice.date}</p>
                </div>
            </div>
            <p className="text-sm text-[#666666] line-clamp-2">{notice.content}</p>
        </motion.div>
    );
}
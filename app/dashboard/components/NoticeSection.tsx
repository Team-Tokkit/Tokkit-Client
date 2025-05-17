"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isNew: boolean;
}

interface NoticesSectionProps {
  notices: Notice[];
  currentNotice: number;
  onNoticeChange: (index: number) => void;
}

export default function NoticesSection({
  notices,
  currentNotice,
  onNoticeChange,
}: NoticesSectionProps) {
  const router = useRouter();
  const now = new Date();

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-medium text-[#111827] flex items-center">
          <span className="bg-gradient-to-r from-[#F43F5E] to-[#D1365A] w-1 h-4 rounded-full mr-2 inline-block"></span>
          공지사항
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-[#6B7280] p-0 h-auto"
          onClick={() => router.push("/notice")}
        >
          전체보기 <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              className={`cursor-pointer ${
                index === currentNotice ? "block" : "hidden"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => router.push(`/notice/${notice.id}?page=1`)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {notice.isNew && (
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    )}
                    <h4 className="font-medium text-[#111827] text-sm">
                      {notice.title}
                    </h4>
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    {notice.createdAt.slice(0, 10)}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] line-clamp-2">
                  {notice.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex justify-center p-2 gap-1.5">
          {notices.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentNotice ? "bg-[#FFB020] w-3" : "bg-gray-300"
              }`}
              onClick={() => onNoticeChange(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

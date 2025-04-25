"use client";

import { useRouter } from "next/navigation";
import { notices } from "@/data/notice";
import NoticeItem from "@/components/notice/NoticeItem";
import { ArrowLeft } from "lucide-react";

export default function NoticesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded hover:bg-gray-100 transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">공지사항</h1>
      </div>
      <div className="bg-white border rounded-xl shadow-sm">
        {notices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  );
}

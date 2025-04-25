"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { notices } from "@/data/notice";
import { ArrowLeft } from "lucide-react";

import NoticeItem from "@/components/notice/NoticeItem";
import Pagination from "@/components/notice/Pagination";

export default function NoticesPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const currentNotices = notices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <div className="bg-white border rounded-xl shadow-sm min-h-[400px] flex flex-col justify-between">
        {currentNotices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

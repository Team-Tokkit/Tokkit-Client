"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notices, type Notice } from "@/data/notice";
import { Badge } from "@/components/notice/Badge";
import { ArrowLeft, Calendar } from "lucide-react";

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = Number(params.id);
    const found = notices.find((n) => n.id === id);
    setNotice(found || null);
    setLoading(false);
  }, [params.id]);

  if (loading) return <div className="p-6 text-gray-500">불러오는 중...</div>;
  if (!notice)
    return (
      <div className="p-6 text-gray-500">공지사항을 찾을 수 없습니다.</div>
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

      <div className="bg-white p-6 rounded-xl border space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Badge />
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {notice.createdAt}
          </div>
        </div>

        <h2 className="text-xl font-semibold">{notice.title}</h2>

        <div className="border-t pt-4 whitespace-pre-line text-sm text-gray-700">
          {notice.content}
        </div>
      </div>
    </div>
  );
}

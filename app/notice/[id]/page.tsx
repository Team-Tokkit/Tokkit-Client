"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Calendar } from "lucide-react";
import SkeletonDetail from "./SkeletonDetail";

export default function NoticeDetailPage() {
  const { id } = useParams();
  const noticeId = Array.isArray(id) ? id[0] : id;
  const [notice, setNotice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!noticeId) return;
    setLoading(true);

    axios
      .get(`http://localhost:8080/api/notice/${noticeId}`)
      .then((response) => {
        setNotice(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching notice:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [noticeId]);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded hover:bg-gray-100 transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">공지사항</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border space-y-6">
        {loading ? (
          <>
            <SkeletonDetail />
          </>
        ) : notice ? (
          <>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{notice.createdAt?.slice(0, 10)}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold">{notice.title}</h2>

            <div className="border-t pt-4 whitespace-pre-line text-sm text-gray-700">
              {notice.content}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            공지사항을 찾을 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

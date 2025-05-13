"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";
import SkeletonDetail from "../components/SkeletonDetail";
import Header from "@/components/common/Header";
import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export default function NoticeDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const noticeId = Array.isArray(id) ? id[0] : id;
  const [notice, setNotice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const page = searchParams.get("page") ?? "1";

  useEffect(() => {
    if (!noticeId) return;
    setLoading(true);

    axios
      .get(`${API_URL}/api/notice/${noticeId}`)
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

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      router.replace(`/notice?page=${page}`);
    };
  
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [page]);  

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="py-2">
        <Header title="공지사항 🔔" />
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

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import NoticeList from "@/app/notice/components/NoticeList";
import Pagination from "@/components/common/Pagination";
import { SkeletonList } from "@/app/notice/components/SkeletonList";
import Header from "@/components/common/Header";

import { getApiUrl } from "@/lib/getApiUrl";
import { getCookie } from "@/lib/cookies";

const API_URL = getApiUrl();

interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoticesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") ?? "1", 10) - 1;

  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [latestNoticeIds, setLatestNoticeIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchNotices() {
      setLoading(true);
      try {
        const token = getCookie("accessToken");
        if (!token) {
          console.error("토큰 없음 → 공지사항 요청 중단");
          return;
        }

        const response = await fetch(
          `${API_URL}/api/notice?page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          const content = data.result.content || [];
          setNotices(content);
          setTotalPages(data.result.totalPages || 1);

          if (currentPage === 0) {
            const now = new Date();
            const latestIds = content
              .filter((notice: any) => {
                const createdAt = new Date(notice.createdAt);
                const diffInDays =
                  (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
                return diffInDays <= 3;
              })
              .map((n: any) => n.id);

            setLatestNoticeIds(latestIds);
          }
        } else {
          console.error("Failed to fetch notices:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, [currentPage]);

  if (loading) {
    return <SkeletonList />;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <div className="py-2">
        <Header title="공지사항 🔔" backHref="/dashboard" />
      </div>

      <NoticeList
        notices={notices}
        latestNoticeIds={latestNoticeIds}
        currentPage={currentPage}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage + 1}
        onPageChange={(page) => router.push(`/notice?page=${page}`)}
      />
    </div>
  );
}

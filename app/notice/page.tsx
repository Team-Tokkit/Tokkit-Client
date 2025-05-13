"use client";

import { useEffect, useState } from "react";
import NoticeList from "@/app/notice/components/NoticeList";
import Pagination from "@/components/common/Pagination";
import { SkeletonList } from "@/app/notice/components/SkeletonList";
import Header from "@/components/common/Header";

interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [latestNoticeIds, setLatestNoticeIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchNotices() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/notice?page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
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
    <div className="container mx-auto max-w-4xl">
      <div className="py-2">
        <Header title="공지사항 🔔" />
      </div>

      <NoticeList notices={notices} latestNoticeIds={latestNoticeIds} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage + 1}
        onPageChange={(page) => setCurrentPage(page - 1)}
      />
    </div>
  );
}

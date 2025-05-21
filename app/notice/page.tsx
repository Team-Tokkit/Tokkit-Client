"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import NoticeList from "@/app/notice/components/NoticeList";
import Pagination from "@/components/common/Pagination";
import { SkeletonList } from "@/app/notice/components/SkeletonList";
import Header from "@/components/common/Header";

import { fetchNoticeList, Notice } from "@/app/notice/api/notice-api";
import { filterLatestNoticeIds } from "@/lib/filterLatestNotices";

export default function NoticesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10) - 1;

  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [latestNoticeIds, setLatestNoticeIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { content, totalPages } = await fetchNoticeList(currentPage);
        setNotices(content);
        setTotalPages(totalPages);

        if (currentPage === 0) {
          const latestIds = filterLatestNoticeIds(content);
          setLatestNoticeIds(latestIds);
        }
      } catch (error) {
        console.error("공지사항 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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

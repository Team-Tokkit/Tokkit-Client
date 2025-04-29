"use client";

import { useEffect, useState } from "react";
import NoticeList from "@/components/notice/NoticeList";
import Pagination from "@/components/notice/Pagination";
import { SkeletonList } from "@/components/notice/SkeletonList";

interface Notice {
  noticeId: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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

        if (response.ok) {
          const data = await response.json();
          setNotices(data.result.content || []);
          setTotalPages(data.result.totalPages || 1);
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
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">공지사항</h1>
      <NoticeList notices={notices} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage + 1}
        onPageChange={(page) => setCurrentPage(page - 1)}
      />
    </div>
  );
}

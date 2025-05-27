"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import NoticeList from "@/app/merchant/notice/components/NoticeList";
import Pagination from "@/components/common/Pagination";
import { SkeletonList } from "@/app/merchant/notice/components/SkeletonList";
import Header from "@/components/common/Header";

import { fetchNoticeList, Notice } from "@/app/merchant/notice/api/notice-api";
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
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="container mx-auto max-w-4xl flex-1 flex flex-col">
            <div className="py-2 flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
                <Header title="공지사항 🔔" backHref="/merchant/dashboard" />
            </div>

            <div className=" flex flex-col mb-8">
                <NoticeList notices={notices} latestNoticeIds={latestNoticeIds} currentPage={currentPage} />
            </div>

            <div className="flex-shrink-0 mb-4">
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage + 1}
                onPageChange={(page) => router.push(`/merchant/notice?page=${page}`)}
            />
            </div>
        </div>
    </div>
    );
}

"use client";

import NoticeItem from "@/app/notice/components/NoticeItem";

interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoticeList({
  notices,
  latestNoticeIds = [],
  currentPage,
}: {
  notices: Notice[];
  latestNoticeIds?: number[];
  currentPage: number;
}) {
  return (
    <div className="bg-gray-50 border rounded-xl shadow-sm min-h-[400px] p-2">
      <div>
        {notices.map((notice) => (
          <NoticeItem
            key={notice.id}
            notice={notice}
            isNew={latestNoticeIds.includes(notice.id)}
            currentPage={currentPage}
          />
        ))}
      </div>
    </div>
  );
}

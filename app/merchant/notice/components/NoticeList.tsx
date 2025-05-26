"use client";

import NoticeItem from "@/app/merchant/notice/components/NoticeItem";

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
    <div className="bg-gray-50 rounded-xl shadow-sm flex-1 p-2 overflow-y-auto">
      <div className="space-y-2">
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
  )
}

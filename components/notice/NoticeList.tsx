"use client";

import NoticeItem from "@/components/notice/NoticeItem";

interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoticeList({ notices }: { notices: Notice[] }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm min-h-[400px] flex flex-col justify-between">
      <div>
        {notices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </div>
    </div>
  );
}

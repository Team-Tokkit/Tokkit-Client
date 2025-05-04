"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/notice/Badge";
import { Notice } from "@/data/notice";

interface NoticeItemProps {
  notice: Notice;
}

export default function NoticeItem({ notice }: NoticeItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/notice/${notice.noticeId}`);
  };

  return (
    <div
      className="group flex flex-col p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Badge />
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {notice.title}
          </h3>
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
        {notice.content}
      </p>
    </div>
  );
}

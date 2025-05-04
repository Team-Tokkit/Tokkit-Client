"use client";

import { useRouter } from "next/navigation";

export default function NoticeItem({ notice }: { notice: any }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/notice/${notice.noticeId}`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="group flex flex-col p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {notice.title}
            </h3>
          </div>
          <span className="text-sm text-gray-400">
            {notice.createdAt?.slice(0, 10)}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
          {notice.content}
        </p>
      </div>
    </>
  );
}

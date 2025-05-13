"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function NoticeItem({
  notice,
  isNew = false,
}: {
  notice: any;
  isNew?: boolean;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/notice/${notice.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm p-4 m-2 flex justify-between items-center cursor-pointer hover:bg-[#FF9500]/65
 transition"
    >
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <h3 className="font-medium text-gray-900">{notice.title}</h3>
          {isNew && (
            <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
              NEW
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>{notice.createdAt?.slice(0, 10)}</span>
        </div>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </div>
  );
}

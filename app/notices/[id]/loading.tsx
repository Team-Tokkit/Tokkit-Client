import { Skeleton } from "@/components/notice/Skeleton";

export default function NoticeDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Skeleton className="h-8 w-32 mb-6" />

      <div className="bg-white p-6 rounded-xl border space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="h-6 w-3/4" />

        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

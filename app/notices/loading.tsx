import { Skeleton } from "@/components/notice/Skeleton";

export default function NoticesLoading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Skeleton className="h-8 w-32 mb-6" />

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-12 rounded-full" />{" "}
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

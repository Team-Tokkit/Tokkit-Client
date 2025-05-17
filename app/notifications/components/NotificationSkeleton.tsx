"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-[#1A1A1A] rounded-xl p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    )
}

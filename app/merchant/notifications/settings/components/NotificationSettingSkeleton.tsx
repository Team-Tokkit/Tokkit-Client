"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationSettingsSkeleton() {
    return (
        <div className="p-4 space-y-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-6 w-12" />
                </div>
            ))}
        </div>
    )
}

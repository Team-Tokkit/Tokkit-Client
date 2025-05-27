"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Category {
    id: string
    label: string
}

interface NotificationTabsProps {
    activeTab: string
    onChange: (value: string) => void
}

const categories: Category[] = [
    { id: "all", label: "전체" },
    { id: "system", label: "시스템" },
    { id: "payment", label: "결제" },
    { id: "voucher", label: "바우처" },
    { id: "token", label: "토큰" },
]

export default function NotificationTabs({ activeTab, onChange }: NotificationTabsProps) {
    return (
        <div className="px-4 pt-4 pb-2 bg-white dark:bg-[#1A1A1A] shadow-sm">
            <Tabs defaultValue="all" value={activeTab} onValueChange={onChange}>
                <TabsList className="w-full overflow-x-auto flex justify-center p-0 bg-transparent h-auto">
                    {categories.map((category) => (
                        <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className="px-6 py-1 text-m rounded-full min-w-0 data-[state=active]:bg-[#FFB020] data-[state=active]:text-white" 
                        >
                            {category.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    )
}

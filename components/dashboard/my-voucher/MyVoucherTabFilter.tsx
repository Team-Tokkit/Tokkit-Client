"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyVoucherTabFilter() {
  return (
    <Tabs defaultValue="recent">
      <TabsList
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-2"
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <TabsTrigger
          value="recent"
          className="flex-1 whitespace-nowrap text-sm font-medium px-1 py-1 text-center min-w-[45px] rounded-md hover:bg-gray-200 transition-colors data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A]"
        >
          최신순
        </TabsTrigger>
        <TabsTrigger
          value="amount"
          className="flex-1 whitespace-nowrap text-sm font-medium px-1 py-1 text-center min-w-[45px] rounded-md hover:bg-gray-200 transition-colors data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A]"
        >
          금액순
        </TabsTrigger>
        <TabsTrigger
          value="expiry"
          className="flex-1 whitespace-nowrap text-sm font-medium px-1 py-1 text-center min-w-[45px] rounded-md hover:bg-gray-200 transition-colors data-[state=active]:bg-white dark:data-[state=active]:bg-[#1A1A1A]"
        >
          만료순
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
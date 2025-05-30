"use client"

import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function MyPageHeaderSkeleton() {
  return (
    <header className="bg-[#F9FAFB] p-5 pt-8 pb-10">
      <div className="flex items-center justify-between mb-8 px-2">
        <Button variant="ghost" size="icon" disabled>
          <ArrowLeft className="h-5 w-5 text-gray-300" />
        </Button>
        <h1 className="text-2xl font-bold">마이페이지</h1>
        <div className="w-10" />
      </div>

      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white shadow-sm mx-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative z-10 p-6">
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse flex-shrink-0 mr-4" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-3 w-40 bg-gray-100 rounded-md animate-pulse" />
            </div>
             <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
          </div>
        </div>
      </motion.div>
    </header>
  )
}

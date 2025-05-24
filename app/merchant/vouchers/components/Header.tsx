import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VouchersHeader() {
    const router = useRouter()
    return (
        <header className="bg-white dark:bg-[#1A1A1A] p-5 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold">바우처 조회</h1>
            </div>
        </header>
    )
}
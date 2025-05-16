"use client"

import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    onClick: () => void
    disabled: boolean
}

export default function StoreSearchButton({ onClick, disabled }: Props) {
    return (
        <div className="absolute top-4 left-0 right-0 flex justify-center z-10">
            <Button
                className="bg-white text-[#4F6EF7] hover:bg-[#4F6EF7] hover:text-white shadow-lg flex items-center rounded-full px-4"
                onClick={onClick}
                disabled={disabled}
            >
                <RefreshCw className="h-4 w-4 mr-2" />이 지역 재검색
            </Button>
        </div>
    )
}

"use client"

import { List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    showList: boolean
    onToggle: () => void
    disabled: boolean
}

export default function StoreListToggleButton({ showList, onToggle, disabled }: Props) {
    return (
        <div className="absolute bottom-24 left-0 right-0 flex justify-center z-10">
            <Button
                className="bg-white text-[#4F6EF7] hover:bg-[#4F6EF7] hover:text-white shadow-lg flex items-center rounded-full px-4"
                onClick={onToggle}
                disabled={disabled}
            >
                <List className="h-4 w-4 mr-2" />
                {showList ? "목록 닫기" : "목록 보기"}
            </Button>
        </div>
    )
}

"use client"

import { Locate } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
    onClick: () => void
    disabled: boolean
}

export default function StoreLocateButton({ onClick, disabled }: Props) {
    return (
        <div className="absolute bottom-4 right-4 z-10">
            <Button
                aria-label="locate-button"
                variant="outline"
                size="icon"
                className="bg-white text-[#4F6EF7] hover:bg-[#4F6EF7] hover:text-white shadow-lg rounded-full h-12 w-12"
                onClick={onClick}
                disabled={disabled}
            >
                <Locate className="h-5 w-5" />
            </Button>
        </div>
    )
}

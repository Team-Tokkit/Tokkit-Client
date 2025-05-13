"use client"

import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"

interface Props {
    show: boolean
    onToggle: () => void
}

export default function StoreCategoryToggleButton({ show, onToggle }: Props) {
    return (
        <Button variant="ghost" size="icon" className="ml-2" onClick={onToggle}>
            {show ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
    )
}
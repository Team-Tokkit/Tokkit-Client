"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface Props {
    searchTerm: string
    setSearchTerm: (term: string) => void
    onSearch: () => void
}

export default function StoreSearchInput({ searchTerm, setSearchTerm, onSearch }: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <form onSubmit={handleSubmit} className="relative flex-1">
            <Input
                type="text"
                placeholder="매장명, 주소 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchTerm && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchTerm("")}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </form>
    )
}
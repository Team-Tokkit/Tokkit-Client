"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface StoreCategorySelectorProps {
    selectedCategory: string
    setSelectedCategory: (val: string) => void
}

const STORE_CATEGORIES = [
    { value: "cafe", label: "카페/디저트" },
    { value: "restaurant", label: "음식점" },
    { value: "retail", label: "소매/편의점" },
    { value: "beauty", label: "미용/뷰티" },
    { value: "fashion", label: "패션/의류" },
    { value: "entertainment", label: "문화/엔터테인먼트" },
    { value: "education", label: "교육/학원" },
    { value: "health", label: "건강/의료" },
    { value: "other", label: "기타" },
]

export default function StoreCategorySelector({ selectedCategory, setSelectedCategory }: StoreCategorySelectorProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="category">상점 카테고리</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
                    <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                    {STORE_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

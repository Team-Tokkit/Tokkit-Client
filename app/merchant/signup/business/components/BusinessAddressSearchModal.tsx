"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Search, RefreshCw, Building } from "lucide-react"

interface AddressItem {
    address_name: string
    road_address_name?: string
    place_name?: string
    x: string // longitude
    y: string // latitude
}

interface BusinessAddressSearchModalProps {
    show: boolean
    keyword: string
    onChangeKeyword: (val: string) => void
    onSearch: () => void
    searching: boolean
    results: AddressItem[]
    onSelect: (item: AddressItem) => void
    onClose: () => void
}

export default function BusinessAddressSearchModal({
                                                       show,
                                                       keyword,
                                                       onChangeKeyword,
                                                       onSearch,
                                                       searching,
                                                       results,
                                                       onSelect,
                                                       onClose,
                                                   }: BusinessAddressSearchModalProps) {
    if (!show) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
            <div className="bg-white dark:bg-[#1E1E1E] p-4 flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={onClose}>
                    <X className="h-5 w-5 text-[#1A1A1A] dark:text-white" />
                </Button>
                <h3 className="text-lg font-medium text-[#1A1A1A] dark:text-white">주소 검색</h3>
            </div>

            <div className="flex-1 bg-[#F5F5F5] dark:bg-[#121212] p-4 overflow-y-auto">
                <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 mb-4">
                    <div className="flex gap-2">
                        <Input
                            value={keyword}
                            onChange={(e) => onChangeKeyword(e.target.value)}
                            placeholder="도로명, 지번, 건물명으로 검색"
                            onKeyDown={(e) => e.key === "Enter" && onSearch()}
                        />
                        <Button
                            type="button"
                            onClick={onSearch}
                            disabled={searching || !keyword.trim()}
                            className="h-12 px-4"
                        >
                            {searching ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                            <span className="ml-2">검색</span>
                        </Button>
                    </div>
                    <p className="text-xs text-[#666666] dark:text-[#BBBBBB] mt-2">
                        도로명, 지번, 건물명 등으로 검색하세요. 예: 테헤란로, 역삼동, 삼성타워
                    </p>
                </div>

                {results.length > 0 ? (
                    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden">
                        <ul className="divide-y divide-[#E0E0E0] dark:divide-[#333333]">
                            {results.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="p-4 hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] cursor-pointer"
                                    onClick={() => onSelect(item)}
                                >
                                    <div className="flex items-start">
                                        <Building className="h-5 w-5 text-[#999999] dark:text-[#777777] mt-0.5 mr-2 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                                                {item.place_name !== item.address_name ? item.place_name : "주소"}
                                            </p>
                                            <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">
                                                {item.road_address_name || item.address_name}
                                            </p>
                                            {item.road_address_name && item.road_address_name !== item.address_name && (
                                                <p className="text-xs text-[#999999] dark:text-[#777777]">{item.address_name}</p>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : keyword && !searching ? (
                    <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 text-center">
                        <p className="text-[#666666] dark:text-[#BBBBBB]">검색 결과가 없습니다.</p>
                        <p className="text-sm text-[#999999] dark:text-[#777777] mt-2">다른 검색어로 다시 시도해보세요.</p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
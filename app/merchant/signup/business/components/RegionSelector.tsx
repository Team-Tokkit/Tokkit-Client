"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RegionSelectorProps {
    selectedSido: string
    setSelectedSido: (val: string) => void
    selectedSigungu: string
    setSelectedSigungu: (val: string) => void
    sigunguList: string[]
}

const SIDO_LIST = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
]

export default function RegionSelector({
                                           selectedSido,
                                           setSelectedSido,
                                           selectedSigungu,
                                           setSelectedSigungu,
                                           sigunguList,
                                       }: RegionSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="sido">시/도</Label>
                <Select value={selectedSido} onValueChange={setSelectedSido}>
                    <SelectTrigger id="sido">
                        <SelectValue placeholder="시/도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        {SIDO_LIST.map((sido) => (
                            <SelectItem key={sido} value={sido}>
                                {sido}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="sigungu">시/군/구</Label>
                <Select
                    value={selectedSigungu}
                    onValueChange={setSelectedSigungu}
                    disabled={!selectedSido || sigunguList.length === 0}
                >
                    <SelectTrigger id="sigungu">
                        <SelectValue placeholder="시/군/구 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        {sigunguList.map((sigungu) => (
                            <SelectItem key={sigungu} value={sigungu}>
                                {sigungu}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import RegionSelector from "./RegionSelector"
import StoreCategorySelector from "./StoreCategorySelector"

interface BusinessInfoFormProps {
    businessNumber: string
    businessName: string
    ownerName: string
    businessAddress: string
    detailAddress: string
    selectedSido: string
    selectedSigungu: string
    sigunguList: string[]
    selectedCategory: string
    onChangeBusinessNumber: (val: string) => void
    onChangeBusinessName: (val: string) => void
    onChangeOwnerName: (val: string) => void
    onClickAddressSearch: () => void
    onChangeDetailAddress: (val: string) => void
    onChangeSido: (val: string) => void
    onChangeSigungu: (val: string) => void
    onChangeCategory: (val: string) => void
    onSubmit: (e: React.FormEvent) => void
    loading: boolean
    formatBusinessNumber: (val: string) => string
}

export default function BusinessInfoForm({
                                             businessNumber,
                                             businessName,
                                             ownerName,
                                             businessAddress,
                                             detailAddress,
                                             selectedSido,
                                             selectedSigungu,
                                             sigunguList,
                                             selectedCategory,
                                             onChangeBusinessNumber,
                                             onChangeBusinessName,
                                             onChangeOwnerName,
                                             onClickAddressSearch,
                                             onChangeDetailAddress,
                                             onChangeSido,
                                             onChangeSigungu,
                                             onChangeCategory,
                                             onSubmit,
                                             loading,
                                             formatBusinessNumber,
                                         }: BusinessInfoFormProps) {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-2">
                <Label htmlFor="businessNumber">사업자 등록번호</Label>
                <Input
                    id="businessNumber"
                    value={formatBusinessNumber(businessNumber)}
                    onChange={(e) => onChangeBusinessNumber(e.target.value)}
                    placeholder="000-00-00000"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="businessName">상호명</Label>
                <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => onChangeBusinessName(e.target.value)}
                    placeholder="상호명을 입력하세요"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="ownerName">대표자명</Label>
                <Input
                    id="ownerName"
                    value={ownerName}
                    onChange={(e) => onChangeOwnerName(e.target.value)}
                    placeholder="대표자명을 입력하세요"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="businessAddress">사업장 주소</Label>
                <Input
                    id="businessAddress"
                    value={businessAddress}
                    onClick={onClickAddressSearch}
                    placeholder="주소 검색 버튼을 클릭하세요"
                    readOnly
                    required
                />
                {businessAddress && (
                    <Input
                        id="detailAddress"
                        value={detailAddress}
                        onChange={(e) => onChangeDetailAddress(e.target.value)}
                        placeholder="상세 주소 입력 (선택)"
                    />
                )}
            </div>

            <RegionSelector
                selectedSido={selectedSido}
                setSelectedSido={onChangeSido}
                selectedSigungu={selectedSigungu}
                setSelectedSigungu={onChangeSigungu}
                sigunguList={sigunguList}
            />

            <StoreCategorySelector
                selectedCategory={selectedCategory}
                setSelectedCategory={onChangeCategory}
            />

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "처리 중..." : "다음"}
            </Button>
        </form>
    )
}

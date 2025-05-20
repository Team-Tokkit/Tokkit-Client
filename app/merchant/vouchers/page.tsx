"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Filter, ArrowLeft, ChevronRight, Tag, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// 바우처 데이터 타입 정의
interface Voucher {
    id: number
    title: string
    description: string
    category: string
    issuer: string
    amount: string
    discountRate: number
    originalPrice: number
    discountedPrice: number
    validPeriod: string
    expiryDate: string
    status: "active" | "expired" | "coming_soon"
    image: string
    usageCount: number
    remainingCount: number
}

export default function MerchantVouchersPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [showFilters, setShowFilters] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [vouchers, setVouchers] = useState<Voucher[]>([])

    // 필터 옵션
    const [filterOptions, setFilterOptions] = useState({
        sortBy: "newest", // "newest", "expiringSoon", "popular"
        status: "all", // "all", "active", "expired", "coming_soon"
    })

    // 바우처 데이터 로딩 (실제로는 API에서 가져와야 함)
    useEffect(() => {
        const fetchVouchers = async () => {
            setIsLoading(true)

            // 실제 구현에서는 API 호출로 대체
            setTimeout(() => {
                const dummyVouchers: Voucher[] = [
                    {
                        id: 1,
                        title: "아메리카노 할인 바우처",
                        description: "모든 아메리카노 음료 20% 할인",
                        category: "cafe",
                        issuer: "토킷 커피",
                        amount: "최대 2,000원",
                        discountRate: 20,
                        originalPrice: 10000,
                        discountedPrice: 8000,
                        validPeriod: "30일",
                        expiryDate: "2023.12.31",
                        status: "active",
                        image: "/cozy-corner-cafe.png",
                        usageCount: 128,
                        remainingCount: 872,
                    },
                    {
                        id: 2,
                        title: "런치 세트 할인",
                        description: "평일 점심 세트메뉴 3,000원 할인",
                        category: "restaurant",
                        issuer: "행복식당",
                        amount: "3,000원",
                        discountRate: 15,
                        originalPrice: 20000,
                        discountedPrice: 17000,
                        validPeriod: "60일",
                        expiryDate: "2023.11.30",
                        status: "active",
                        image: "/crispy-fried-chicken.png",
                        usageCount: 56,
                        remainingCount: 144,
                    },
                    {
                        id: 3,
                        title: "영화 티켓 할인",
                        description: "일반 2D 영화 티켓 5,000원 할인",
                        category: "entertainment",
                        issuer: "메가 시네마",
                        amount: "5,000원",
                        discountRate: 30,
                        originalPrice: 15000,
                        discountedPrice: 10000,
                        validPeriod: "90일",
                        expiryDate: "2023.10.15",
                        status: "expired",
                        image: "/classic-movie-theater.png",
                        usageCount: 200,
                        remainingCount: 0,
                    },
                    {
                        id: 4,
                        title: "헤어 케어 패키지",
                        description: "커트 + 트리트먼트 10% 할인",
                        category: "beauty",
                        issuer: "뷰티살롱",
                        amount: "최대 10,000원",
                        discountRate: 10,
                        originalPrice: 100000,
                        discountedPrice: 90000,
                        validPeriod: "60일",
                        expiryDate: "2023.12.15",
                        status: "active",
                        image: "/hair-salon-interior.png",
                        usageCount: 42,
                        remainingCount: 158,
                    },
                    {
                        id: 5,
                        title: "신규 회원 특별 할인",
                        description: "첫 구매 시 5,000원 할인",
                        category: "shopping",
                        issuer: "행복마트",
                        amount: "5,000원",
                        discountRate: 0,
                        originalPrice: 0,
                        discountedPrice: 0,
                        validPeriod: "30일",
                        expiryDate: "2023.12.31",
                        status: "active",
                        image: "/local-grocery-store.png",
                        usageCount: 89,
                        remainingCount: 911,
                    },
                    {
                        id: 6,
                        title: "겨울 시즌 스페셜",
                        description: "겨울 신메뉴 2,000원 할인",
                        category: "cafe",
                        issuer: "토킷 커피",
                        amount: "2,000원",
                        discountRate: 15,
                        originalPrice: 13000,
                        discountedPrice: 11000,
                        validPeriod: "90일",
                        expiryDate: "2024.02.28",
                        status: "coming_soon",
                        image: "/steaming-coffee-cup.png",
                        usageCount: 0,
                        remainingCount: 1000,
                    },
                ]

                setVouchers(dummyVouchers)
                setIsLoading(false)
            }, 1000)
        }

        fetchVouchers()
    }, [])

    // 필터링된 바우처 목록
    const filteredVouchers = vouchers
        .filter((voucher) => {
            // 검색어 필터링
            const matchesSearch =
                voucher.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                voucher.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                voucher.issuer.toLowerCase().includes(searchQuery.toLowerCase())

            // 카테고리 필터링
            const matchesCategory = selectedCategory === "all" || voucher.category === selectedCategory

            // 상태 필터링
            const matchesStatus = filterOptions.status === "all" || voucher.status === filterOptions.status

            return matchesSearch && matchesCategory && matchesStatus
        })
        .sort((a, b) => {
            // 정렬
            switch (filterOptions.sortBy) {
                case "expiringSoon":
                    return (
                        new Date(a.expiryDate.replace(/\./g, "-")).getTime() - new Date(b.expiryDate.replace(/\./g, "-")).getTime()
                    )
                case "popular":
                    return b.usageCount - a.usageCount
                case "newest":
                default:
                    return b.id - a.id
            }
        })

    // 카테고리 목록
    const categories = [
        { id: "all", name: "전체" },
        { id: "cafe", name: "카페" },
        { id: "restaurant", name: "음식점" },
        { id: "entertainment", name: "엔터테인먼트" },
        { id: "beauty", name: "뷰티" },
        { id: "shopping", name: "쇼핑" },
    ]

    // 상태에 따른 배지 스타일
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">사용 가능</Badge>
            case "expired":
                return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">만료됨</Badge>
            case "coming_soon":
                return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">출시 예정</Badge>
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] pb-20">
            {/* 헤더 */}
            <header className="bg-white dark:bg-[#1A1A1A] p-5 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold">바우처 관리</h1>
                </div>
            </header>

            {/* 검색 및 필터 */}
            <div className="p-4 bg-white dark:bg-[#1A1A1A] shadow-sm">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="바우처 검색"
                        className="pl-10 pr-4 py-2 rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between mb-4">
                    <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
                        <TabsList className="overflow-x-auto flex-nowrap w-full justify-start">
                            {categories.map((category) => (
                                <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                                    {category.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 flex-shrink-0"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-5 w-5" />
                    </Button>
                </div>

                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-4 p-4 bg-gray-50 dark:bg-[#252525] rounded-lg"
                    >
                        <h3 className="font-medium mb-2">정렬</h3>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className={`justify-start ${filterOptions.sortBy === "newest" ? "bg-[#FFB020]/10" : ""}`}
                                onClick={() => setFilterOptions({ ...filterOptions, sortBy: "newest" })}
                            >
                                최신순
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`justify-start ${filterOptions.sortBy === "expiringSoon" ? "bg-[#FFB020]/10" : ""}`}
                                onClick={() => setFilterOptions({ ...filterOptions, sortBy: "expiringSoon" })}
                            >
                                마감 임박순
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`justify-start ${filterOptions.sortBy === "popular" ? "bg-[#FFB020]/10" : ""}`}
                                onClick={() => setFilterOptions({ ...filterOptions, sortBy: "popular" })}
                            >
                                인기순
                            </Button>
                        </div>

                        <h3 className="font-medium mb-2">상태</h3>
                        <div className="grid grid-cols-4 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className={`justify-start ${filterOptions.status === "all" ? "bg-[#FFB020]/10" : ""}`}
                                onClick={() => setFilterOptions({ ...filterOptions, status: "all" })}
                            >
                                전체
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`justify-start ${filterOptions.status === "active" ? "bg-[#FFB020]/10" : ""}`}
                                onClick={() => setFilterOptions({ ...filterOptions, status: "active" })}
                            >
                                사용 가능
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`justify-start ${filterOptions.status === "expired" ? "bg-[#FFB020]/10" : ""}`}
                                onClick={() => setFilterOptions({ ...filterOptions, status: "expired" })}
                            >
                                만료됨
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className={`justify-start ${filterOptions.status === "coming_soon" ? "bg-[#FFB020]/10" : ""}`}
                                onClick={() => setFilterOptions({ ...filterOptions, status: "coming_soon" })}
                            >
                                출시 예정
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* 바우처 통계 요약 */}
            <div className="p-4">
                <Card className="border-none shadow-sm mb-4">
                    <CardContent className="p-4">
                        <h3 className="font-medium mb-3">바우처 현황</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-[#F8F9FA] dark:bg-[#1E1E1E] p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">활성 바우처</p>
                                <p className="text-lg font-bold text-[#1A1A1A] dark:text-white">
                                    {isLoading ? "-" : vouchers.filter((v) => v.status === "active").length}개
                                </p>
                            </div>
                            <div className="bg-[#F8F9FA] dark:bg-[#1E1E1E] p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">총 사용 횟수</p>
                                <p className="text-lg font-bold text-[#1A1A1A] dark:text-white">
                                    {isLoading ? "-" : vouchers.reduce((acc, v) => acc + v.usageCount, 0)}회
                                </p>
                            </div>
                            <div className="bg-[#F8F9FA] dark:bg-[#1E1E1E] p-3 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">출시 예정</p>
                                <p className="text-lg font-bold text-[#1A1A1A] dark:text-white">
                                    {isLoading ? "-" : vouchers.filter((v) => v.status === "coming_soon").length}개
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 바우처 목록 */}
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">바우처 목록 ({filteredVouchers.length})</h2>

                {isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm p-4 animate-pulse">
                                <div className="flex items-start">
                                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mr-3"></div>
                                    <div className="flex-1">
                                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredVouchers.length > 0 ? (
                    <div className="space-y-4">
                        {filteredVouchers.map((voucher) => (
                            <motion.div
                                key={voucher.id}
                                className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden cursor-pointer"
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => router.push(`/merchant/vouchers/${voucher.id}`)}
                            >
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden mr-3 relative">
                                            <Image
                                                src={voucher.image || "/placeholder.svg"}
                                                alt={voucher.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-medium text-[#1A1A1A] dark:text-white">{voucher.title}</h3>
                                                {getStatusBadge(voucher.status)}
                                            </div>
                                            <p className="text-sm text-[#666666] dark:text-[#BBBBBB] mb-2">{voucher.description}</p>
                                            <div className="flex items-center text-xs text-[#666666] dark:text-[#BBBBBB]">
                                                <Tag className="h-3 w-3 mr-1" />
                                                <span className="mr-3">{voucher.amount}</span>
                                                <Calendar className="h-3 w-3 mr-1" />
                                                <span>~{voucher.expiryDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-xs text-[#666666] dark:text-[#BBBBBB]">
                                                <span className="font-medium text-[#1A1A1A] dark:text-white">{voucher.usageCount}</span> /{" "}
                                                {voucher.usageCount + voucher.remainingCount} 사용
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-[#4C6EF5] hover:text-[#364FC7] p-0 h-auto"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                router.push(`/merchant/vouchers/${voucher.id}`)
                                            }}
                                        >
                                            <span className="text-xs">상세보기</span>
                                            <ChevronRight className="h-3 w-3 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm">
                        <p className="text-[#666666] dark:text-[#BBBBBB] mb-4">검색 결과가 없습니다.</p>
                        <Button
                            className="bg-[#FFB020] hover:bg-[#FF9500] dark:bg-[#FFD485] dark:hover:bg-[#FFCA5A] text-white dark:text-[#1A1A1A]"
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedCategory("all")
                                setFilterOptions({
                                    sortBy: "newest",
                                    status: "all",
                                })
                            }}
                        >
                            필터 초기화
                        </Button>
                    </div>
                )}
            </div>

            {/* 바우처 생성 버튼 */}
            <div className="fixed bottom-6 right-6">
                <Button
                    className="w-14 h-14 rounded-full bg-[#FFB020] hover:bg-[#FF9500] shadow-lg"
                    onClick={() => router.push("/merchant/vouchers/create")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                </Button>
            </div>
        </div>
    )
}

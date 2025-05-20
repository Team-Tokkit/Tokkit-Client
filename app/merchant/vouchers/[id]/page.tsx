"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, FileText, ChevronDown, ChevronUp, Edit, Trash2, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface VoucherDetailProps {
    params: {
        id: string
    }
}

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
    createdAt: string
    terms: string[]
    usageHistory: {
        date: string
        customerType: string
        amount: number
    }[]
}

export default function VoucherDetailPage({ params }: VoucherDetailProps) {
    const router = useRouter()
    const [expandedSection, setExpandedSection] = useState<string | null>("stats")
    const [isLoading, setIsLoading] = useState(true)
    const [voucher, setVoucher] = useState<Voucher | null>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    // 바우처 데이터 로딩 (실제로는 API에서 가져와야 함)
    useEffect(() => {
        const fetchVoucherDetail = async () => {
            setIsLoading(true)

            // 실제 구현에서는 API 호출로 대체
            setTimeout(() => {
                // 예시 데이터
                const voucherData: Voucher = {
                    id: Number(params.id),
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
                    createdAt: "2023.06.01",
                    terms: [
                        "본 바우처는 토킷 커피 전 매장에서 사용 가능합니다.",
                        "아메리카노 음료에 한해 적용되며, 다른 메뉴는 할인 대상에서 제외됩니다.",
                        "다른 할인 혜택과 중복 적용되지 않습니다.",
                        "유효기간 내 사용하지 않을 경우 자동으로 소멸됩니다.",
                        "환불 및 교환은 불가능합니다.",
                    ],
                    usageHistory: [
                        { date: "2023.10.15", customerType: "일반회원", amount: 8000 },
                        { date: "2023.10.14", customerType: "일반회원", amount: 8000 },
                        { date: "2023.10.12", customerType: "VIP회원", amount: 8000 },
                        { date: "2023.10.10", customerType: "일반회원", amount: 8000 },
                        { date: "2023.10.08", customerType: "신규회원", amount: 8000 },
                    ],
                }

                setVoucher(voucherData)
                setIsLoading(false)
            }, 1000)
        }

        fetchVoucherDetail()
    }, [params.id])

    const toggleSection = (section: string) => {
        if (expandedSection === section) {
            setExpandedSection(null)
        } else {
            setExpandedSection(section)
        }
    }

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

    // 바우처 삭제 처리
    const handleDeleteVoucher = () => {
        // 실제 구현에서는 API 호출로 대체
        setShowDeleteDialog(false)
        router.push("/merchant/vouchers")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] flex flex-col">
                <header className="bg-white dark:bg-[#1A1A1A] p-5 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-bold">바우처 상세</h1>
                    </div>
                </header>

                <div className="p-4 flex-1">
                    <div className="animate-pulse">
                        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!voucher) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">바우처를 찾을 수 없습니다</h1>
                    <Button onClick={() => router.push("/merchant/vouchers")}>바우처 목록으로 돌아가기</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] pb-20">
            {/* 헤더 */}
            <header className="bg-white dark:bg-[#1A1A1A] p-5 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-bold">바우처 상세</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#666666] dark:text-[#BBBBBB]"
                            onClick={() => router.push(`/merchant/vouchers/edit/${voucher.id}`)}
                        >
                            <Edit className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => setShowDeleteDialog(true)}>
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* 바우처 정보 */}
            <div className="p-4">
                <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden mb-4">
                    <div className="relative h-48">
                        <Image src={voucher.image || "/placeholder.svg"} alt={voucher.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-4 right-4">{getStatusBadge(voucher.status)}</div>
                        <div className="absolute bottom-4 left-4">
                            <h1 className="text-2xl font-bold text-white">{voucher.title}</h1>
                            <p className="text-sm text-white/80">{voucher.description}</p>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-[#666666] dark:text-[#BBBBBB]">할인율</p>
                                <p className="text-xl font-bold">{voucher.discountRate}%</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#666666] dark:text-[#BBBBBB]">할인 금액</p>
                                <p className="text-xl font-bold">{voucher.amount}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-[#666666] dark:text-[#BBBBBB]">정가</p>
                                <p className="text-base font-medium line-through">{voucher.originalPrice.toLocaleString()}원</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#666666] dark:text-[#BBBBBB]">할인가</p>
                                <p className="text-base font-medium">{voucher.discountedPrice.toLocaleString()}원</p>
                            </div>
                        </div>

                        <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 text-[#666666] dark:text-[#BBBBBB] mr-2" />
                            <p className="text-sm">
                                <span className="text-[#666666] dark:text-[#BBBBBB]">유효기간: </span>
                                {voucher.validPeriod}
                            </p>
                        </div>

                        <div className="flex items-center mb-4">
                            <Clock className="h-4 w-4 text-[#666666] dark:text-[#BBBBBB] mr-2" />
                            <p className="text-sm">
                                <span className="text-[#666666] dark:text-[#BBBBBB]">만료일: </span>
                                {voucher.expiryDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 바우처 통계 */}
                <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden mb-4">
                    <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleSection("stats")}>
                        <div className="flex items-center">
                            <BarChart2 className="h-5 w-5 mr-3 text-[#FFB020] dark:text-[#FFD485]" />
                            <h3 className="font-medium">바우처 통계</h3>
                        </div>
                        {expandedSection === "stats" ? (
                            <ChevronUp className="h-5 w-5 text-[#666666] dark:text-[#BBBBBB]" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-[#666666] dark:text-[#BBBBBB]" />
                        )}
                    </div>

                    {expandedSection === "stats" && (
                        <div className="px-4 pb-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-3">
                                        <p className="text-xs text-[#666666] dark:text-[#BBBBBB] mb-1">총 발행 수량</p>
                                        <p className="text-lg font-bold">
                                            {(voucher.usageCount + voucher.remainingCount).toLocaleString()}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-sm">
                                    <CardContent className="p-3">
                                        <p className="text-xs text-[#666666] dark:text-[#BBBBBB] mb-1">사용 수량</p>
                                        <p className="text-lg font-bold">{voucher.usageCount.toLocaleString()}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-medium mb-2">사용 현황</p>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                                    <div
                                        className="h-2.5 rounded-full bg-[#FFB020]"
                                        style={{ width: `${(voucher.usageCount / (voucher.usageCount + voucher.remainingCount)) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-[#666666] dark:text-[#BBBBBB]">
                  <span>
                    {Math.round((voucher.usageCount / (voucher.usageCount + voucher.remainingCount)) * 100)}% 사용됨
                  </span>
                                    <span>{voucher.remainingCount.toLocaleString()}개 남음</span>
                                </div>
                            </div>

                            <Button
                                className="w-full"
                                variant="outline"
                                onClick={() => router.push(`/merchant/vouchers/stats/${voucher.id}`)}
                            >
                                상세 통계 보기
                            </Button>
                        </div>
                    )}
                </div>

                {/* 이용 약관 */}
                <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden mb-4">
                    <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleSection("terms")}>
                        <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-[#FFB020] dark:text-[#FFD485]" />
                            <h3 className="font-medium">이용 약관</h3>
                        </div>
                        {expandedSection === "terms" ? (
                            <ChevronUp className="h-5 w-5 text-[#666666] dark:text-[#BBBBBB]" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-[#666666] dark:text-[#BBBBBB]" />
                        )}
                    </div>

                    {expandedSection === "terms" && (
                        <div className="px-4 pb-4">
                            <ul className="list-disc pl-5 text-sm text-[#666666] dark:text-[#BBBBBB] space-y-2">
                                {voucher.terms.map((term, index) => (
                                    <li key={index}>{term}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* 사용 내역 */}
                <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden mb-4">
                    <div
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleSection("history")}
                    >
                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-3 text-[#FFB020] dark:text-[#FFD485]" />
                            <h3 className="font-medium">최근 사용 내역</h3>
                        </div>
                        {expandedSection === "history" ? (
                            <ChevronUp className="h-5 w-5 text-[#666666] dark:text-[#BBBBBB]" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-[#666666] dark:text-[#BBBBBB]" />
                        )}
                    </div>

                    {expandedSection === "history" && (
                        <div className="px-4 pb-4">
                            {voucher.usageHistory.length > 0 ? (
                                <div className="space-y-3">
                                    {voucher.usageHistory.map((history, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">{history.date}</p>
                                                <p className="text-xs text-[#666666] dark:text-[#BBBBBB]">{history.customerType}</p>
                                            </div>
                                            <p className="text-sm font-medium">{history.amount.toLocaleString()}원</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-[#666666] dark:text-[#BBBBBB] text-center py-4">
                                    아직 사용 내역이 없습니다.
                                </p>
                            )}

                            {voucher.usageHistory.length > 0 && (
                                <Button
                                    className="w-full mt-3"
                                    variant="outline"
                                    onClick={() => router.push(`/merchant/vouchers/history/${voucher.id}`)}
                                >
                                    전체 사용 내역 보기
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* 삭제 확인 다이얼로그 */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>바우처 삭제</DialogTitle>
                        <DialogDescription>정말로 이 바우처를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            취소
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteVoucher}>
                            삭제
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

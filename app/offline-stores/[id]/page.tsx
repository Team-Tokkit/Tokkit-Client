"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/common/Pagination"
import { Copy } from "lucide-react"
import { fetchStoreDetail, fetchStoreVouchers, StoreInfo, VoucherInfo } from "../api/store-api"
import Header from "@/components/common/Header"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

// 스켈레톤 컴포넌트 개선 (공지사항 참고)
function SkeletonDetail() {
    return (
        <div className="space-y-4">
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/5 bg-gray-200 rounded animate-pulse" />
            <div className="border-t my-4" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-5/6 bg-gray-200 rounded animate-pulse" />
        </div>
    )
}

// 로딩 바니 이미지 컴포넌트
function LoadingBunny() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] py-12">
            <img src="/images/loading-bunny.png" alt="로딩 중" className="w-32 h-32 mb-4 animate-bounce" />
            <span className="text-[#FF9500] font-bold text-lg mt-2">로딩 중입니다...</span>
        </div>
    )
}

// 바우처 리스트용 스켈레톤
function SkeletonVoucherList() {
    return (
        <ul className="space-y-3 flex-1">
            {[1, 2, 3].map((i) => (
                <li key={i}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg px-4 py-4 bg-gray-100 animate-pulse min-h-[72px]">
                        <div className="flex-1 min-w-0">
                            <div className="h-4 w-2/3 bg-gray-300 rounded mb-2" />
                            <div className="h-3 w-1/3 bg-gray-200 rounded" />
                        </div>
                        <div className="mt-2 md:mt-0 md:ml-4 h-5 w-20 bg-gray-200 rounded" />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default function StoreDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [store, setStore] = useState<StoreInfo | null>(null)
    const [vouchers, setVouchers] = useState<VoucherInfo[]>([])
    const [loading, setLoading] = useState(true)
    const [voucherLoading, setVoucherLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // 예시: userId는 실제 로그인 정보에서 받아와야 함
    const userId = 1

    useEffect(() => {
        setLoading(true)
        fetchStoreDetail(String(id))
            .then((data) => {
                setStore(data)
                setLoading(false)
            })
    }, [id])

    useEffect(() => {
        setVoucherLoading(true)
        fetchStoreVouchers(String(id), userId, page - 1)
            .then((data) => {
                setVouchers(data.content)
                setTotalPages(data.totalPages)
                setVoucherLoading(false)
            })
    }, [id, page])

    const handleCopy = () => {
        if (store?.address) {
            navigator.clipboard.writeText(store.address)
            toast.success("주소가 복사되었습니다!")
        }
    }

    return (
        <div className="container mx-auto max-w-2xl px-4">
            <div className="py-2">
                <Header title="상점 상세" />
            </div>
            <div className="bg-white p-6 rounded-xl border space-y-6 min-h-[600px] flex flex-col justify-start shadow-md">
                {loading ? (
                    <LoadingBunny />
                ) : (
                    <>
                        {/* 상단: 상점 정보 */}
                        {store ? (
                            <>
                                <div className="flex items-center gap-2 mb-2">
                                    <h2 className="text-2xl font-bold text-[#1A1A1A] truncate max-w-[60vw]">{store.storeName}</h2>
                                    <span className="bg-green-100 text-green-700 rounded px-2 py-0.5 text-xs font-semibold">{store.category}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm mb-1 gap-1">
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#BDBDBD" d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.02 10.61 7.32 10.83.41.3.95.3 1.36 0C13.98 21.61 21 16.25 21 11c0-4.97-4.03-9-9-9Zm0 18.54C9.14 18.1 5 14.28 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.28-4.14 7.1-7 9.54Zm0-13.04A3.5 3.5 0 0 0 8.5 11c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5A3.5 3.5 0 0 0 12 7.5Zm0 5A1.5 1.5 0 1 1 12 10a1.5 1.5 0 0 1 0 3Z" /></svg>
                                    <span className="truncate max-w-[60vw] cursor-pointer hover:underline" title={store.address}>{store.address}</span>
                                    <Button size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(store.address); toast.success("주소가 복사되었습니다!") }} className="ml-1"><Copy className="w-4 h-4" /></Button>
                                </div>
                                {/* <div className="flex items-center gap-2 mt-1">
                                    <span className="bg-green-100 text-green-700 rounded px-2 py-0.5 text-xs font-semibold">경의중앙</span>
                                    <span className="text-xs text-gray-500">수색역 1번 출구에서 976m</span>
                                </div> */}
                                <div className="text-xs text-gray-400">우편번호: {store.postalCode}</div>
                            </>
                        ) : (
                            <div>상점 정보를 불러올 수 없습니다.</div>
                        )}
                        {/* 하단: 바우처 목록 */}
                        <div className="pt-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold mb-3">사용 가능한 바우처</h3>
                            {voucherLoading ? (
                                <SkeletonVoucherList />
                            ) : vouchers.length > 0 ? (
                                <ul className="space-y-3 flex-1">
                                    {vouchers.map((voucher, idx) => (
                                        <li key={voucher.voucherId + "-" + idx}>
                                            <div className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg px-4 py-4 bg-gray-50 hover:bg-blue-50 transition cursor-pointer min-h-[72px] relative group"
                                                onClick={() => router.push(`/my-vouchers/details/${voucher.voucherId}`)}>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-gray-900 truncate flex items-center gap-2">
                                                        {/* 만료임박 뱃지는 남겨둠 */}
                                                        {voucher.validUntil < new Date().toISOString().slice(0, 10) && <span className="bg-red-100 text-red-700 rounded px-2 py-0.5 text-xs font-semibold animate-pulse">만료임박</span>}
                                                        {voucher.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">유효기간: {voucher.validUntil}</div>
                                                </div>
                                                <div className="mt-2 md:mt-0 md:ml-4 text-base font-bold text-blue-600 whitespace-nowrap group-hover:scale-110 transition-transform">잔액: {voucher.balance.toLocaleString()}원</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center text-gray-400 py-6 flex-1 flex items-center justify-center">사용 가능한 바우처가 없습니다.</div>
                            )}
                            {/* 페이징 */}
                            <div className="mt-6 flex justify-center gap-2">
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={page}
                                    onPageChange={setPage}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
} 
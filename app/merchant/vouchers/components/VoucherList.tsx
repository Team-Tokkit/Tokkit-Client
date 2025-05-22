import VoucherCard from "@/app/merchant/vouchers/components/VoucherCard"
import { getVouchers } from "@/app/merchant/vouchers/api/voucher"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Pagination from "@/components/common/Pagination"
import { Voucher } from "@/app/vouchers/types/voucher"

interface Props {
    keyword: string
}

export default function VoucherList({ keyword }: Props) {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [vouchers, setVouchers] = useState<Voucher[]>([])
    const searchParams = useSearchParams()

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setLoading(true)

            getVouchers({
                keyword,
                page: page - 1,
                size: 10,
            })
                .then((data) => {
                    setVouchers(data.content)
                    setTotalPages(data.totalPages)
                })
                .catch((error) => {
                    console.error("Error fetching vouchers:", error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 600)
        return () => clearTimeout(debounceTimer)
    }, [keyword, page])



    if (loading) {
        return (
            <div className="space-y-4 p-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
                    >
                        <div className="h-40 bg-gray-200" />
                        <div className="p-4 space-y-3">
                            <div className="h-5 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                            <div className="flex justify-between items-center mt-4">
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-16" />
                                    <div className="h-4 bg-gray-200 rounded w-24" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-24" />
                                    <div className="h-4 bg-gray-200 rounded w-16" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (vouchers.length === 0) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <p className="text-center text-gray-500 text-lg">검색 결과가 없습니다.</p>
            </div>
        )
    }


    return (
        <div>
            <div className="space-y-4 mb-5 p-4">
                {vouchers.map((voucher) => (
                    <VoucherCard key={voucher.id} voucher={voucher} />
                ))}
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
            />
        </div>
    )
}
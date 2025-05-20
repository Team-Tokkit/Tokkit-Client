"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import  VouchersHeader  from "@/app/merchant/vouchers/components/Header"
import  VoucherSearchBar  from "@/app/merchant/vouchers/components/SearchBar"
import  VoucherList  from "@/app/merchant/vouchers/components/VoucherList"


export default function MerchantVouchersPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] pb-20">
            
            {/* 헤더 */}
            <VouchersHeader/>

            {/* 검색바 */}
            <VoucherSearchBar/>


            {/* 바우처 목록 */}
            <VoucherList/>
        </div>
    )
}

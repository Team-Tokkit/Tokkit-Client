import { getApiUrl } from "@/lib/getApiUrl"
import { fetchWithAuth } from "@/lib/fetchWithAuth"

const API_URL = getApiUrl()

export interface StoreInfo {
    storeId: number
    storeName: string
    category: string
    address: string
    postalCode: string
}

export interface VoucherInfo {
    voucherId: number
    name: string
    validUntil: string
    balance: number
}

export interface FetchVouchersResult {
    content: VoucherInfo[]
    totalPages: number
}

export async function fetchStoreDetail(id: string): Promise<StoreInfo> {
    const response = await fetchWithAuth(`${API_URL}/api/users/store/${id}`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json()
    const result = typeof data.result === "string" ? JSON.parse(data.result) : data.result
    return result
}

export async function fetchStoreVouchers(storeId: string, userId: number, page: number): Promise<FetchVouchersResult> {
    const response = await fetchWithAuth(`${API_URL}/api/users/store/${storeId}/vouchers?userId=${userId}&page=${page}`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json()
    console.log(data)
    const result = typeof data.result === "string" ? JSON.parse(data.result) : data.result
    return {
        content: result.content || [],
        totalPages: result.totalPages || 1,
    }
} 
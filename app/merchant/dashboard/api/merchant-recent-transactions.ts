import {getApiUrl} from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export interface MerchantTransaction {
    id: number;
    type: string;
    amount: number;
    createdAt: string;
    displayDescription: string;
}

export async function fetchMerchantRecentTransactions(limit: number = 3): Promise<MerchantTransaction[]> {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/wallet/transactions/recent`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) throw new Error("가맹점주 최근 거래 내역을 불러오지 못했습니다.");

    const data = await res.json();

    if (!data.isSuccess) throw new Error(data.message || "응답 실패");

    return data.result.slice(0, limit).map(
        (item: any) => ({
            id: item.id,
            type: item.type,
            amount: item.amount,
            createdAt: item.createdAt,
            displayDescription: item.displayDescription,
        })
    )
}

export default async function fetchMerchantTransactions(): Promise<MerchantTransaction[]> {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/wallet/transactions`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) throw new Error("가맹점주 거래 내역을 불러오지 못했습니다.");

    const data = await res.json();

    if (!data.isSuccess) throw new Error(data.message || "응답 실패");

    console.log(data.result)

    return data.result;
}
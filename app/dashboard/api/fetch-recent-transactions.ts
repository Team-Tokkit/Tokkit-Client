import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export interface Transaction {
    id: number;
    type: string;
    amount: number;
    createdAt: string;
    displayDescription?: string;
}

export async function fetchRecentTransactions(limit: number = 3): Promise<Transaction[]> {
    const res = await fetchWithAuth(`${API_URL}/api/users/wallet/transactions`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("거래내역 요청 실패");
    }

    const data = await res.json();
    console.log(data);

    if (!data.isSuccess) {
        throw new Error(data.message || "응답 실패");
    }

    return data.result.slice(0, limit);
}

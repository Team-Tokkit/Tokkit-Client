import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export interface Transaction {
    id: number;
    type: "PAYMENT" | "CONVERT" | "AUTO_CONVERT";
    amount: number;
    createdAt: string;
    displayDescription: string;
}

export async function fetchTransactions(): Promise<Transaction[]> {
    const res = await fetchWithAuth(`${API_URL}/api/users/wallet/transactions`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
    }

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    console.log(data);

    if (data?.isSuccess) {
        return data.result;
    } else {
        throw new Error(data?.message || "거래내역 조회 실패");
    }
}

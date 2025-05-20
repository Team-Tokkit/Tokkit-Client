import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export interface TransactionDetail {
    id: number;
    type: "PAYMENT" | "CHARGE" | "CONVERT";
    amount: number;
    description: string;
    createdAt: string;
}

export async function fetchTransactionDetail(id: string): Promise<TransactionDetail> {
    const res = await fetchWithAuth(`${API_URL}/api/users/wallet/transactions/${id}`, {
        credentials: "include",
    });

    const data = await res.json();

    if (!data.isSuccess) {
        throw new Error(data.message || "거래 상세 조회 실패");
    }

    return data.result;
}

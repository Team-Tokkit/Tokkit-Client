import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function tokenToDeposit(amount: number, simplePassword: string) {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/wallet/convert/token-to-deposit`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ amount, simplePassword }),
    });

    const data = await res.json();

    if (!data.isSuccess) throw new Error(data.message || "전환 실패");

    return data.result;
}

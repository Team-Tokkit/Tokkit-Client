import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export async function convertBalance(
    userId: number,
    amount: number,
    isDepositToToken: boolean
) {
    const endpoint = isDepositToToken
        ? "/api/wallet/convert/deposit-to-token"
        : "/api/wallet/convert/token-to-deposit";

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount }),
    });

    const data = await response.json();
    if (!data.isSuccess) {
        throw new Error(data.message || "전환 실패");
    }

    return data;
}

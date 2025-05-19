import { getApiUrl } from "@/lib/getApiUrl";
import { getCookie } from "@/lib/cookies";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function fetchWalletBalance() {
    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const response = await fetchWithAuth(`${API_URL}/api/wallet/balance`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    });

    const data = await response.json();

    if (!data.isSuccess) throw new Error(data.message || "잔액 조회 실패");

    return {
        depositBalance: data.result.depositBalance,
        tokenBalance: data.result.tokenBalance,
    };
}

export async function fetchWalletTransactions() {
    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const res = await fetch(`${API_URL}/api/wallet/transactions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`거래내역 요청 실패: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    return data.result;
}

export async function verifyPassword(simplePassword: string) {
    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const res = await fetchWithAuth(`${API_URL}/api/users/simple-password/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ simplePassword: simplePassword }),
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "비밀번호가 올바르지 않습니다.");
    }
}

export async function convertBalance(
    type: "deposit-to-token" | "token-to-deposit",
    amount: number,
    simplePassword: string
) {
    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const endpoint =
        type === "deposit-to-token"
            ? "/api/wallet/convert/deposit-to-token"
            : "/api/wallet/convert/token-to-deposit";

    const response = await fetchWithAuth(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ amount, simplePassword }),
    });

    const data = await response.json();

    if (!data.isSuccess) {
        throw new Error(data.message || "전환 실패");
    }

    return data;
}
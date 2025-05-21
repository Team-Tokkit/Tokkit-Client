import {getApiUrl} from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function fetchDailyIncome() {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/wallet/daily-income`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) throw new Error("가맹점주 일일 수익 정보를 불러오지 못했습니다.");

    const data = await res.json();

    const parsedResult = typeof data.result === "string" ? JSON.parse(data.result) : data.result;

    return parsedResult;
}
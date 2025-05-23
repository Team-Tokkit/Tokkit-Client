import {getApiUrl} from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export interface MerchantInfo {
    id: number;
    name: string;
    storeName: string;
    email: string;
    phoneNumber: string;
    businessNumber: string;
    roadAddress: string;
    sido: string;
    sigungu: string;
    category: string;
}

export async function getMerchantInfo() {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/info`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("가맹점주 정보를 불러오지 못했습니다.");
    }

    const data = await res.json();
    return data.result;
}
import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function fetchWalletInfo(accessToken: string) {
    const res = await fetchWithAuth(`${API_URL}/api/users/wallet`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
    });

    if (!res.ok) throw new Error("지갑 정보를 불러오지 못했습니다.");

    const data = await res.json();
    return data.result;
}

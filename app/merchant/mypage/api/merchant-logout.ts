import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export const merchantLogout = async () => {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("로그아웃에 실패했습니다.");
    }

    return res;
}
import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function updateUserInfo(data: { name: string; phoneNumber: string }) {
    const res = await fetchWithAuth(`${API_URL}/api/users/info-update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("회원정보 수정 실패");
    }

    return res.json();
}

import {getApiUrl} from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function verifyMerchantSimplePassword(simplePassword: string) {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/simple-password/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 🔥 반드시 추가
        },
        credentials: "include",
        body: JSON.stringify({ simplePassword }),
    });

    if (!res.ok) throw new Error("비밀번호가 일치하지 않습니다.");
}

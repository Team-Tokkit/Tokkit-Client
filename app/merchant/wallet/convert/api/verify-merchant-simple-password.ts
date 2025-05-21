import {getApiUrl} from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function verifyMerchantSimplePassword(simplePassword: string) {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/simple-password/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ simplePassword }),
    });

    const data = await res.json();

    if (!data.isSuccess) return false;

    return true;
}

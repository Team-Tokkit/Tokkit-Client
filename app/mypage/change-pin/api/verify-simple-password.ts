import { getApiUrl } from "@/lib/getApiUrl"
import { fetchWithAuth } from "@/lib/fetchWithAuth"

const API_URL = getApiUrl()

// 간편 비밀번호 유효성 검증
export async function verifySimplePassword(accessToken: string, simplePassword: string): Promise<void> {
    const res = await fetchWithAuth(`${API_URL}/api/users/simple-password/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ simplePassword }),
        credentials: "include",
    })

    if (!res.ok) {
        throw new Error("간편 비밀번호가 올바르지 않습니다.")
    }
}

// 간편 비밀번호 수정 요청
export async function updateSimplePassword(accessToken: string, simplePassword: string): Promise<void> {
    const res = await fetchWithAuth(`${API_URL}/api/users/simple-password/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ simplePassword: simplePassword }),
        credentials: "include",
    })

    if (!res.ok){
        throw new Error("간편 비밀번호 수정에 실패했습니다.")
    }
}

import { getApiUrl } from "@/lib/getApiUrl"
import { fetchWithAuth } from "@/lib/fetchWithAuth"

const API_URL = getApiUrl()

// 임시 비밀번호 발송 요청
export async function sendSimplePasswordResetEmail(email: string): Promise<void> {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/find-simple-password?email=${encodeURIComponent(email)}`, {
        method: "POST",
    })

    if (!res.ok) {
        throw new Error("임시 비밀번호 발송에 실패했습니다.")
    }
}

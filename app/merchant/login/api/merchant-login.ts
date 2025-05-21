import { setCookie } from "@/lib/cookies"
import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export interface MerchantLoginRequest {
    businessNumber: string
    password: string
}

export async function loginMerchant(data: MerchantLoginRequest): Promise<void> {
    const res = await fetch(`${API_URL}/api/merchants/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        const message = error?.message || '로그인에 실패했습니다.'
        throw new Error(message)
    }

    const dataJson = await res.json()
    const { accessToken, refreshToken } = dataJson.result

    setCookie("accessToken", accessToken)
    setCookie("refreshToken", refreshToken, 3600 * 24 * 7) // 7일
}
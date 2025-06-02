import { getApiUrl } from "@/lib/getApiUrl"
import { fetchWithAuth } from "@/lib/fetchWithAuth"

const API_URL = getApiUrl()

interface AutoConvertSettingRequest {
    enabled: boolean
    dayOfMonth: number
    hour: number
    minute: number
    amount: number
}

export async function updateAutoConvertSetting(payload: AutoConvertSettingRequest) {
    const res = await fetchWithAuth(`${API_URL}/api/users/wallet/auto-convert`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`자동 전환 설정 실패: ${res.status} ${errorText}`)
    }

    return res.json()
}

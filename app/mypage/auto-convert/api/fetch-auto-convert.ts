import { getApiUrl } from "@/lib/getApiUrl"
import { fetchWithAuth } from "@/lib/fetchWithAuth"

const API_URL = getApiUrl()

export interface AutoConvertSettingResponse {
    enabled: boolean
    dayOfMonth: number | null
    hour: number | null
    minute: number | null
    amount: number | null
}

export async function fetchAutoConvertSetting(): Promise<AutoConvertSettingResponse> {
    const res = await fetchWithAuth(`${API_URL}/api/users/wallet/auto-convert`, {
        method: "GET",
        credentials: "include",
    })

    if (!res.ok) {
        throw new Error("자동 전환 조회 실패")
    }

    const json = await res.json()
    return json.result
}

export async function updateAutoConvertSetting(payload: AutoConvertSettingResponse) {
    const res = await fetchWithAuth(`${API_URL}/api/users/wallet/auto-convert`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`자동 전환 저장 실패: ${text}`)
    }

    return res.json()
}

import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export interface SidoResponse {
    sidoName: string
}

export interface SigunguResponse {
    sigunguName: string
}

export async function fetchSidoList(): Promise<string[]> {
    const res = await fetch(`${API_URL}/api/regions/sido`)

    if (!res.ok) {
        throw new Error("시/도 목록을 불러오지 못했습니다.")
    }

    const data = await res.json()
    return data.result.map((item: SidoResponse) => item.sidoName)
}

export async function fetchSigunguList(sido: string): Promise<string[]> {
    const res = await fetch(`${API_URL}/api/regions/sigungu?sido=${encodeURIComponent(sido)}`)

    if (!res.ok) {
        throw new Error("시/군/구 목록을 불러오지 못했습니다.")
    }

    const data = await res.json()
    return data.result.map((item: SigunguResponse) => item.sigunguName)
}

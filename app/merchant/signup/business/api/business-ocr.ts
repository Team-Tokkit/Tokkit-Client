import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export interface BusinessOcrResult {
    businessNumber: string
    storeName: string
    representativeName: string
    roadAddress: string
}

export async function requestBusinessOcr(imageFile: File): Promise<BusinessOcrResult> {
    const formData = new FormData()
    formData.append("image", imageFile)

    const res = await fetch(`${API_URL}/api/ocr/business`, {
        method: "POST",
        body: formData,
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        const message = error?.message || "사업자등록증 인식에 실패했습니다."
        throw new Error(message)
    }

    const json = await res.json();
    return {
        businessNumber: json.result.businessNumber,
        storeName: json.result.storeName,
        representativeName: json.result.representativeName,
        roadAddress: json.result.roadAddress,
    }
}

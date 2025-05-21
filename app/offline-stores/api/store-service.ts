import axios from "axios"
import type {Store, StoreSearchParams} from "../types"
import {getApiUrl} from "@/lib/getApiUrl";
import { getCookie } from "@/lib/cookies";

const accessToken = getCookie("accessToken");

const API_URL = getApiUrl()
/**
 * 주변 매장 검색 함수 (axios 기반)
 * @param params 검색 파라미터
 * @returns 매장 목록
 */
export async function fetchNearbyStores(params: StoreSearchParams): Promise<Store[]> {
    try {

        const response = await axios.get<any>(`${API_URL}/api/users/store/nearby`, {
            params,
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken ? `Bearer ${accessToken}` : "",
            },
        })
        const data = response.data

        if (!data.isSuccess) {
            throw new Error(data.message || "API 요청 실패")
        }

        const stores = data.result || []

        return stores
    } catch (error) {
        console.error("API 요청 중 오류 발생:", error)
        throw error
    }
}

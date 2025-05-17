import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export interface UserInfo {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}

export async function getUserInfo(accessToken: string): Promise<UserInfo> {
    const res = await fetchWithAuth(`${API_URL}/api/users/info`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("유저 정보를 불러오지 못했습니다.");
    }

    const data = await res.json();
    return data.result;
}
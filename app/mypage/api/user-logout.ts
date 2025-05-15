import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export const logout = async () => {
    const res = await fetch(`${API_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include", // refreshToken 쿠키 포함
    });

    if (!res.ok) {
        throw new Error("로그아웃 실패");
    }

    return res;
};
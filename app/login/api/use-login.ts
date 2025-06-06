import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const res = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error("로그인에 실패했습니다.");
        }

        const data: { result: { accessToken: string; refreshToken: string } } = await res.json();
        const { accessToken, refreshToken } = data.result;

        // 쿠키에 저장 (예시: 1일 유효)
        document.cookie = `accessToken=${accessToken}; path=/; max-age=86400;`;
        document.cookie = `refreshToken=${refreshToken}; path=/; max-age=86400;`;

        return { accessToken, refreshToken };
    };

    return { login };
};

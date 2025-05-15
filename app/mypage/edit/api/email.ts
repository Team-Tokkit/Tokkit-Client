import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function requestEmailVerification(email: string) {
    const res = await fetch(`${API_URL}/api/users/emailCheck?email=${email}`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) throw new Error("이메일 인증 요청 실패");
    return res.json();
}

export async function verifyEmailCode(email: string, code: string) {
    const res = await fetch(`${API_URL}/api/users/verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, verification: code }),
    });

    if (!res.ok) throw new Error("인증번호 확인 실패");
    return res.json();
}

export async function updateEmail(accessToken: string, newEmail: string) {
    const res = await fetchWithAuth(`${API_URL}/api/users/email-update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ newEmail }),
    });

    if (!res.ok) throw new Error("이메일 변경 실패");
    return res.json();
}

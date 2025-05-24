import {getApiUrl} from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function updatePassword(password: string, newPassword: string) {
    const res = await fetchWithAuth(`${API_URL}/api/users/password-update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            password,
            newPassword,
        })
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || '비밀번호 변경에 실패했습니다.');
    }

    return true;
}
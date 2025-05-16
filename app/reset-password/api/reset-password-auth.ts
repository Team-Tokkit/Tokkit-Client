import axios from "axios";
import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export const requestTempPassword = async (email: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/findPw`, null, {
            params: { email },
        });

        const data = response.data;

        if (!data.isSuccess) {
            const error = new Error(data.message);
            (error as any).code = data.code;
            throw error;
        }

        return data;
    } catch (err: any) {
        // axios 자체 에러 처리도 포함
        const response = err?.response;

        if (response?.data && !response.data.isSuccess) {
            const error = new Error(response.data.message);
            (error as any).code = response.data.code;
            throw error;
        }

        // 네트워크 오류 등
        throw new Error("네트워크 오류 또는 알 수 없는 오류가 발생했습니다.");
    }
};


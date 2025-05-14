import axios from "axios";

import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

// 이메일 인증 요청: 쿼리 파라미터 사용
export const sendEmailVerificationCode = async (email: string) => {
    const response = await axios.post(`${API_URL}/api/users/emailCheck`, null, {
        params: { email },
    });
    return response.data;
};

// 이메일 인증번호 검증: JSON body 사용
export const verifyEmailCode = async (email: string, code: string) => {
    const response = await axios.post(`${API_URL}/api/users/verification`, {
        email,
        verification: code,
    });
    return response.data;
};

// 회원가입 요청: JSON body로 보내기
export const submitContactInfo = async (data: {
    name: String;
    email: string;
    password: string;
    phoneNumber: string;
    simplePassword: string;
}) => {
    const response = await axios.post(`${API_URL}/api/users/register`, data);
    return response.data;
};

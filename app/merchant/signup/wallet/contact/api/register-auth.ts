import axios from "axios";

import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

// 이메일 인증 요청: 쿼리 파라미터 사용
export const sendEmailMerchantVerificationCode = async (email: string) => {
    const response = await axios.post(`${API_URL}/api/merchants/emailCheck`, null, {
        params: { email },
    });
    return response.data;
};

// 이메일 인증번호 검증: JSON body 사용
export const verifyMerchantEmailCode = async (email: string, code: string) => {
    const response = await axios.post(`${API_URL}/api/merchants/verification`, {
        email,
        verification: code,
    });
    return response.data;
};

// 회원가입 요청: JSON body로 보내기
export interface CreateMerchantRequest {
    name: string
    email: string
    phoneNumber: string
    password: string
    simplePassword: string
    businessNumber: string

    storeName: string
    roadAddress: string
    sidoName: string
    sigunguName: string
    storeCategory: string
}

export const submitMerchantContactInfo = async (data: CreateMerchantRequest) => {
    const response = await axios.post(`${API_URL}/api/merchants/register`, data)
    return response.data
}

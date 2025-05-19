import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";
import { getCookie } from "@/lib/cookies";
const API_URL = getApiUrl();

export interface PaymentOptionResponse {
    type: "TOKEN" | "VOUCHER";
    voucherOwnershipId?: number;
    name: string;
    balance: number;
    expireDate: string;
    usable: boolean;
    storeCategory: string;
}

export async function getPaymentOptions(storeId: string): Promise<PaymentOptionResponse[]> {
    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const res = await fetch(`${API_URL}/api/wallet/payment-options?storeId=${storeId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("결제 수단 목록을 불러오지 못했습니다.");
    const json = await res.json();
    return json.result;
}


// 간편 비밀번호 검증
export async function verifySimplePassword(simplePassword: string): Promise<boolean> {
    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const res = await fetchWithAuth(`${API_URL}/api/users/simple-password/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ simplePassword }),
    });

    return res.ok;
}

// 토큰 결제
export async function submitTokenPayment(
    merchantId: number,
    amount: number,
    simplePassword: string,
    idempotencyKey: string,
) {
    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const res = await fetchWithAuth(`${API_URL}/api/wallet/pay-with-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            merchantId: Number(merchantId),
            amount,
            simplePassword,
        }),
    });

    return await res.json();
}

// 바우처 결제
export async function submitVoucherPayment(
    voucherOwnershipId: number,
    merchantId: number,
    storeId: number,
    amount: number,
    simplePassword: string,
    idempotencyKey: string,
) {
    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const res = await fetchWithAuth(`${API_URL}/api/wallet/pay-with-voucher`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            voucherOwnershipId: Number(voucherOwnershipId),
            merchantId: Number(merchantId),
            storeId: Number(storeId),
            simplePassword,
            amount,
        }),
    });

    return await res.json();
}

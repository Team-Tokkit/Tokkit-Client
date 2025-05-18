import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";
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

export async function getPaymentOptions(storeId: string, accessToken: string): Promise<PaymentOptionResponse[]> {
    const res = await fetch(`${API_URL}/api/wallet/payment-options?storeId=${storeId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) throw new Error("결제 수단 목록을 불러오지 못했습니다.");
    const json = await res.json();
    return json.result;
}


// 간편 비밀번호 검증
export async function verifySimplePassword(simplePassword: string, accessToken: string): Promise<boolean> {
    const res = await fetchWithAuth(`${API_URL}/api/users/simple-password/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ simplePassword }),
    });

    return res.ok;
}

// 토큰 결제
export async function submitTokenPayment(
    userId: number,
    merchantId: string,
    amount: number,
    simplePassword: string,
    idempotencyKey: string,
    accessToken: string
) {
    const res = await fetchWithAuth(`${API_URL}/api/wallet/pay-with-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            userId,
            merchantId: Number(merchantId),
            amount,
            simplePassword,
        }),
    });

    return await res.json();
}

// 바우처 결제
export async function submitVoucherPayment(
    userId: number,
    voucherOwnershipId: string,
    amount: number,
    idempotencyKey: string,
    accessToken: string
) {
    const res = await fetchWithAuth(`${API_URL}/api/wallet/pay-with-voucher`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            userId,
            voucherOwnershipId: Number(voucherOwnershipId),
            amount,
        }),
    });

    return await res.json();
}

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

export interface StoreInfoResponse {
    storeId: number;
    merchantId: number;
    storeName: string;
    address: string;
    merchantName: string;
}

// 가맹점 조회
export async function fetchStoreInfo(storeId: number, merchantId: number) {
    const url = new URL(`${API_URL}/api/store/info`);
    url.searchParams.append("storeId", storeId);
    url.searchParams.append("merchantId", merchantId);

    const res = await fetchWithAuth(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("가맹점 정보를 불러오지 못했습니다.");
    }

    const data = await res.json();
    return data.result;
}


// 결제 수단 조회
export async function getPaymentOptions(storeId: number): Promise<PaymentOptionResponse[]> {
    const res = await fetchWithAuth(`${API_URL}/api/wallet/payment-options?storeId=${storeId}`, {
        method: "GET",
    });

    if (!res.ok) throw new Error("결제 수단 목록을 불러오지 못했습니다.");
    const json = await res.json();
    return json.result;
}


// 간편 비밀번호 검증
export async function verifySimplePassword(simplePassword: string): Promise<boolean> {

    const res = await fetchWithAuth(`${API_URL}/api/users/simple-password/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

    const res = await fetchWithAuth(`${API_URL}/api/wallet/pay-with-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
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
    const res = await fetchWithAuth(`${API_URL}/api/wallet/pay-with-voucher`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
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

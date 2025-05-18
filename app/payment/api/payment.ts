import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export interface PaymentPayload {
    userId: number;
    voucherOwnershipId: string;
    merchantId: string;
    storeId: string;
    amount: number;
    simplePassword: string;
}

export async function verifySimplePassword(userId: number, simplePassword: string) {
    const res = await fetch(`${API_URL}/wallet/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, simplePassword }),
    });
    return res.json(); // result.verified
}

export async function submitVoucherPayment(userId: number, voucherOwnershipId: string, amount: number, idempotencyKey: string) {
    const res = await fetch(`${API_URL}/wallet/pay-with-voucher`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({ userId, voucherOwnershipId: Number(voucherOwnershipId), amount }),
    });
    return res.json();
}

export async function submitTokenPayment(userId: number, merchantId: string, amount: number, simplePassword: string, idempotencyKey: string) {
    const res = await fetch(`${API_URL}/wallet/pay-with-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({ userId, merchantId: Number(merchantId), amount, simplePassword }),
    });
    return res.json();
}
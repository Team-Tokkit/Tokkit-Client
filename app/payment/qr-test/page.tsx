"use client";

import QRCode from "@/components/qr-code";
import { mockStoreQR } from "@/data/payment/storeqr";

function createTransactionId(merchantId: string, storeId: string): string {
    return `m${merchantId}s${storeId}`;
}

export default function QRTestPage() {
    const entries = Object.entries(mockStoreQR);

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold mb-4">테스트용 QR 코드 목록</h1>
            {entries.map(([storeId, store]) => {
                const txId = createTransactionId(store.merchantId, store.storeId);

                return (
                    <div
                        key={storeId}
                        className="p-4 bg-white rounded-xl shadow-md w-fit flex flex-col items-center gap-2"
                    >
                        <h3 className="font-bold text-base">{store.storeId}</h3>
                        <QRCode value={txId} size={150} />
                        <p className="text-sm text-gray-500 mt-2">거래번호: <code>{txId}</code></p>
                    </div>
                );
            })}
        </div>
    );
}

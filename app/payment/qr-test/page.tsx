"use client";

import QRCode from "@/components/qr-code";
import { mockStoreQR } from "@/data/payment/storeqr";

export default function QRTestPage() {
  const entries = Object.entries(mockStoreQR);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold mb-4">테스트용 QR 코드 목록</h1>
      {entries.map(([storeId, store]) => (
        <div
          key={storeId}
          className="p-4 bg-white rounded-xl shadow-md w-fit flex flex-row items-center"
        >
          <h3 className="font-bold mb-2">{store.merchantName}</h3>
          <QRCode
            value={JSON.stringify({
              storeId: store.storeId,
              merchantId: store.merchantId,
            })}
            size={150}
          />
        </div>
      ))}
    </div>
  );
}

"use client"

import QRPageHeader from "@/app/merchant/mypage/qr-code/components/QrHeader"
import MerchantInfoCard from "@/app/merchant/mypage/qr-code/components/MerchantInfoCard"
import QRCodeSection from "@/app/merchant/mypage/qr-code/components/QRCodeSection"
import PaymentGuideSection from "@/app/merchant/mypage/qr-code/components/PaymentGuideSection"
import { mockStoreQR } from "./data/storeqr"

export default function MerchantQRCodePage() {
    const storeId = "1"
    const storeData = mockStoreQR[storeId]

    const txId = `m${storeData.merchantId}s${storeData.storeId}`

    return (
        <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex flex-col max-w-md mx-auto">
            <QRPageHeader />
            <div className="flex-1 p-3 pb-6 flex flex-col min-h-0">
                <MerchantInfoCard name={storeData.storeName} address={storeData.address} />
                <QRCodeSection txId={txId} />
                <PaymentGuideSection paymentCode={txId.slice(-6)} /> {/* 가짜 결제코드 표현 */}
            </div>
        </div>
    )
}

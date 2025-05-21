"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import { fetchMerchantWalletInfo } from "../dashboard/api/merchant-wallet-info";
import WalletCard from "@/app/merchant/wallet/components/WalletCard";
import ConvertButton from "@/app/merchant/wallet/components/ConvertButton";
import WalletGuide from "@/app/merchant/wallet/components/WalletGuide";
import {
    fetchMerchantRecentTransactions,
    MerchantTransaction
} from "@/app/merchant/dashboard/api/merchant-recent-transactions";
import MerchantRecentTransaction from "@/app/merchant/dashboard/components/MerchantRecentTransaction";

export default function MerchantWalletPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const refresh = searchParams.get("refresh");

    const [recentMerchantTransactions, setRecentMerchantTransactions] = useState<MerchantTransaction[]>([])
    const [loading, setLoading] = useState(true);

    const [walletInfo, setWalletInfo] = useState<{
        storeName: string;
        accountNumber: string;
        tokenBalance: number;
        depositBalance: number;
    } | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchMerchantWalletInfo()
                    .then((data) => {
                        setWalletInfo(data);
                    })
                    .catch((err) => {
                        console.error("지갑 정보 로딩 실패:", err);
                    });

                fetchMerchantRecentTransactions(3)
                    .then(setRecentMerchantTransactions)
                    .catch((err) => {
                        console.error("거래내역 조회 실패:", err);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } catch (error) {
                console.error("API 요청 오류:", error);
                alert("지갑 데이터를 불러오는 중 오류 발생");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refresh]);

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <header className="bg-white">
                <Header title="전자지갑" />
                {walletInfo && (
                    <WalletCard
                        storeName={walletInfo?.storeName ?? ""}
                        accountNumber={walletInfo?.accountNumber ?? ""}
                        tokenBalance={walletInfo?.tokenBalance ?? 0}
                        depositBalance={walletInfo.depositBalance ?? 0}
                    />
                )}
                <div className="flex-1 flex flex-col p-4">
                    <ConvertButton />

                    <MerchantRecentTransaction
                        transactions={recentMerchantTransactions}
                        loading={loading}
                    />

                    <WalletGuide />
                </div>
            </header>
        </div>
    );
}

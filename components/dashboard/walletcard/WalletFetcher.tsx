import WalletCard from "./WalletCard";

interface WalletData {
    userName: string;
    balance: number;
    accountNumber: string;
}

async function fetchWalletData(): Promise<WalletData> {
    return {
        userName: "봄바르딜로 크로코딜로",
        balance: 1000000,
        accountNumber: "우리 1020-9564-9584",
    };
}

export default async function WalletFetcher() {
    const walletData = await fetchWalletData();
    return <WalletCard walletData={walletData} />;
}

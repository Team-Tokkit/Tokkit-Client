import WalletCard from "./WalletCard";

interface WalletData {
    userName: string;
    balance: number;
    accountNumber: string;
}

async function fetchWalletData(): Promise<WalletData> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay
    return {
        userName: "이정민",
        balance: 0,
        accountNumber: "우리 1020-9564-9584",
    };
}

export default async function WalletFetcher() {
    const walletData = await fetchWalletData();
    return <WalletCard walletData={walletData} />;
}

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Header from "@/components/common/Header";
import WalletGuide from "@/app/wallet/components/common/WalletGuide";
import TransactionList from "@/components/common/TransactionList";
import ConvertButton from "@/app/wallet/components/common/ConvertButton";
import WalletCard from "@/app/wallet/components/common/WalletCard";
import { getCookie } from "@/lib/cookies";
import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export default function WalletPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refresh = searchParams.get("refresh");

  const [userName, setUserName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [depositBalance, setDepositBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseJwt = (token: string): any | null => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return;

    const fetchWalletData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/wallet`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("지갑 정보를 불러오는 데 실패했습니다.");

        const data = await res.json();
        const result = data.result;

        setUserName(result.name);
        setAccountNumber(result.accountNumber);
        setTokenBalance(result.tokenBalance);
        setDepositBalance(result.depositBalance);
        setTransactions(result.transactions || []);
      } catch (err) {
        console.error("지갑 정보 조회 실패:", err);
        alert("지갑 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [refresh]);

  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white">
        <Header title="전자지갑" />
        {tokenBalance !== null && depositBalance !== null && (
          <WalletCard
            tokenBalance={tokenBalance}
            depositBalance={depositBalance}
            userName={userName}
            accountNumber={accountNumber}
          />
        )}
        <div className="flex-1 flex flex-col p-4">
          <ConvertButton />

          <div className="bg-[#F5F5F5] px-4 py-5 rounded-xl">
            <TransactionList
              label="최근 거래"
              transactions={transactions}
              limit={3}
            />
            <div className="flex justify-center items-center h-8 mt-5">
              <Button
                variant="ghost"
                className="text-[#666666] flex items-center justify-center gap-1 text-base leading-none"
                onClick={() => router.push("/wallet/totaltransaction")}
              >
                전체 거래내역 보기
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <WalletGuide />
        </div>
      </header>
    </div>
  );
}

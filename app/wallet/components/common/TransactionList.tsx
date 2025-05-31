import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import TransactionCardContent from "./TransactionCardContent"
import { Transaction } from "@/app/wallet/api/fetch-transactions";

interface TransactionListProps {
    transactions: Transaction[];
    limit?: number;
}

export default function TransactionList({
                                            transactions,
                                            limit,
                                        }: TransactionListProps) {
    const router = useRouter();
    const data = limit ? transactions.slice(0, limit) : transactions;

    return (
        <div className="space-y-4">
            {data.length > 0 ? (
                data.map((tx, index) => {
                    if (typeof tx.id !== "number") {
                        return null;
                    }

                    const handleClick = () => {
                        router.push(`/wallet/totaltransaction/${tx.id}`);
                    };

                    return (
                        <Card
                            key={tx.id ?? index}
                            onClick={handleClick}
                            data-cy="transaction-item"
                            className="bg-white border-none shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <CardContent className="p-4">
                                <TransactionCardContent
                                    displayDescription={tx.displayDescription}
                                    amount={tx.amount}
                                    createdAt={tx.createdAt}
                                    type={tx.type}
                                />
                            </CardContent>
                        </Card>
                    );
                })
            ) : (
                <div className="text-sm text-center text-[#999999] py-10">
                    표시할 거래 내역이 없습니다.
                </div>
            )}
        </div>
    );
}

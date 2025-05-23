import {useRouter} from "next/navigation";
import {Card, CardContent} from "@/components/ui/card";
import TransactionCardContent from "@/components/common/TransactionCardContent";

interface MerchantTransaction {
    id?: number;
    type: string;
    amount: number;
    displayDescription: string;
    createdAt: string;
}

interface MerchantTransactionListProps {
    label?: string;
    transactions: MerchantTransaction[];
    limit?: number;
}

export default function TransactionList({
                                            label,
                                            transactions,
                                            limit,
                                        }: MerchantTransactionListProps) {
    const router = useRouter();

    const data = limit ? transactions.slice(0, limit) : transactions;

    return (
        <div className="space-y-4">
            {label && (
                <h2 className="text-sm font-semibold text-[#333333]">{label}</h2>
            )}
            {data.length > 0 ? (
                data.map((tx, index) => {
                    if (typeof tx.id !== "number") {
                        return null;
                    }

                    const handleClick = () => {
                        router.push(`/merchant/wallet/totaltransaction/${tx.id}`);
                    };

                    return (
                        <Card
                            key={tx.id ?? index}
                            onClick={handleClick}
                            className="bg-white border-none shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <CardContent className="p-4">
                                <TransactionCardContent
                                    displayDescription={tx.displayDescription}
                                    amount={tx.amount}
                                    createdAt={tx.createdAt}
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
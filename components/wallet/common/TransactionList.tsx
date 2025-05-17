import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownUp, QrCode } from "lucide-react";
import { Transaction } from "@/data/wallet/wallet";

interface TransactionListProps {
  label?: string;
  transactions: Transaction[];
  limit?: number;
}

export default function TransactionList({
  label,
  transactions,
  limit,
}: TransactionListProps) {
  const data = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="space-y-4">
      {label && (
        <h2 className="text-sm font-semibold text-[#333333]">{label}</h2>
      )}
      {data.length > 0 ? (
        data.map((tx) => (
          <Card key={tx.id} className="bg-white border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      tx.type === "결제"
                        ? "bg-red-100"
                        : tx.type === "충전"
                        ? "bg-green-100"
                        : tx.type === "전환"
                        ? "bg-blue-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    {tx.type === "결제" ? (
                      <QrCode className="h-5 w-5 text-red-500" />
                    ) : tx.type === "충전" ? (
                      <ArrowDownUp className="h-5 w-5 text-green-500" />
                    ) : tx.type === "전환" ? (
                      <ArrowDownUp className="h-5 w-5 text-blue-500" />
                    ) : (
                      <ArrowDownUp className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">{tx.merchant}</p>
                    <p className="text-xs text-[#666666]">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      tx.type === "결제"
                        ? "text-red-500"
                        : tx.type === "충전"
                        ? "text-green-500"
                        : tx.type === "전환"
                        ? "text-blue-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {tx.type === "결제" ? "-" : "+"}
                    {tx.amount.toLocaleString()}원
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-sm text-center text-[#999999] py-10">
          표시할 거래 내역이 없습니다.
        </div>
      )}
    </div>
  );
}

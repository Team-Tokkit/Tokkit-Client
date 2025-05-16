import { ArrowDownUp } from "lucide-react";

interface Props {
  description: string;
  amount: number;
  createdAt: string;
  disableClick?: boolean;
}

export default function TransactionCardContent({
  description,
  amount,
  createdAt,
}: Props) {
  const isDepositToToken =
    description.includes("예금") &&
    description.includes("토큰") &&
    description.indexOf("예금") < description.indexOf("토큰");

  const isTokenToDeposit =
    description.includes("토큰") &&
    description.includes("예금") &&
    description.indexOf("토큰") < description.indexOf("예금");

  const colorClass = isDepositToToken
    ? "text-green-500"
    : isTokenToDeposit
    ? "text-blue-500"
    : "text-gray-500";

  const bgColorClass = isDepositToToken
    ? "bg-green-100"
    : isTokenToDeposit
    ? "bg-blue-100"
    : "bg-gray-100";

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${bgColorClass}`}
        >
          <ArrowDownUp className={`h-5 w-5 ${colorClass}`} />
        </div>
        <div>
          <p className="font-medium text-[#1A1A1A]">{description}</p>
          <p className="text-xs text-[#666666]">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className={`font-bold ${colorClass}`}>
        {amount >= 0 ? "+" : ""}
        {amount.toLocaleString()}원
      </div>
    </div>
  );
}

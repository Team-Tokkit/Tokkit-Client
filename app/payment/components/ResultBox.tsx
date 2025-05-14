import { StoreQRInfo } from "@/data/payment/storeqr";
import { MyVouchers } from "@/data/payment/payment";

interface ResultBoxProps {
  paymentAmount: string;
  storeQRInfo: StoreQRInfo | null;
  selectedVoucher: MyVouchers;
}

export default function ResultBox({
  paymentAmount,
  storeQRInfo,
  selectedVoucher,
}: ResultBoxProps) {
  const isToken = selectedVoucher.id === "token";
  const remaining = selectedVoucher.balance - Number(paymentAmount);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-8 w-full max-w-xs">
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-[#666666]">결제수단</span>
          <span className="text-[#1A1A1A]">
            {isToken ? "토큰" : selectedVoucher.title}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#666666]">가맹점</span>
          <span className="text-[#1A1A1A]">{storeQRInfo?.merchantName || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#666666]">결제 일시</span>
          <span className="text-[#1A1A1A]">
            {new Date()
              .toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\. /g, ".")
              .replace(",", " ")}
          </span>
        </div>

        <div className="pt-5 mt-2 border-t border-gray-100 space-y-3">
          <div className="flex justify-between">
            <span className="text-[#666666]">결제 금액</span>
            <span className="font-bold text-yellow-500">
              {Number(paymentAmount).toLocaleString()}원
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#666666]">
              {isToken ? "토큰 잔액" : "바우처 잔액"}
            </span>
            <span
              className={`font-bold ${
                isToken
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text"
                  : "text-[#1A1A1A]"
              }`}
            >
              {remaining.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

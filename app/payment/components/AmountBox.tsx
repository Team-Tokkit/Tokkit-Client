import AmountInput from "@/components/common/AmountInput";
import { Voucher } from "@/data/payment/payment";

interface Props {
  amount: string;
  setAmount: (val: string) => void;
  currentBalance: number;
  selectedVoucher: Voucher;
  onCancel: () => void;
  onSubmit: () => void;
  children?: React.ReactNode;
}

export default function AmountBox({
  amount,
  setAmount,
  currentBalance,
  selectedVoucher,
  onCancel,
  onSubmit,
  children,
}: Props) {
  const numericAmount = Number(amount);
  const exceeded = numericAmount > currentBalance;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
      {children && <div className="mb-16">{children}</div>}
      <h3 className="text-lg font-bold text-[#1A1A1A] mt-5">결제 금액 입력</h3>
      <div>
        <AmountInput
          amount={amount}
          onChange={setAmount}
          onMax={() => setAmount(String(currentBalance))}
          label="결제 금액"
          bottomRightText={
            numericAmount > 0 && (
              <p
                className={`text-sm text-right break-keep ${
                  exceeded ? "text-red-500" : "text-gray-500"
                }`}
              >
                {exceeded
                  ? `최대 ${currentBalance.toLocaleString()}원까지 결제 가능합니다.`
                  : `결제 후 잔액: ${(
                      currentBalance - numericAmount
                    ).toLocaleString()}원`}
              </p>
            )
          }
        />
        <div className="flex space-x-4 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-12 rounded-lg border border-gray-300 text-[#1A1A1A]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white rounded-lg"
            disabled={exceeded || !numericAmount}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}

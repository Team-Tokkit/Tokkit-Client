interface BalanceCardProps {
  type: "deposit-to-token" | "token-to-deposit";
  depositBalance: number;
  tokenBalance: number;
}

export default function BalanceCard({
  type,
  depositBalance,
  tokenBalance,
}: BalanceCardProps) {
  const isDepositToToken = type === "deposit-to-token";

  const primaryStyle = "text-base font-semibold text-[#1A1A1A]";
  const secondaryStyle = "text-base text-[#666666]";

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
      {isDepositToToken ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <p className={secondaryStyle}>예금 잔액</p>
            <p className={primaryStyle}>{depositBalance.toLocaleString()}원</p>
          </div>
          <div className="flex justify-between items-center">
            <p className={secondaryStyle}>토큰 잔액</p>
            <p className={primaryStyle}>{tokenBalance.toLocaleString()}원</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <p className={secondaryStyle}>토큰 잔액</p>
            <p className={primaryStyle}>{tokenBalance.toLocaleString()}원</p>
          </div>
          <div className="flex justify-between items-center">
            <p className={secondaryStyle}>예금 잔액</p>
            <p className={primaryStyle}>{depositBalance.toLocaleString()}원</p>
          </div>
        </>
      )}
    </div>
  );
}

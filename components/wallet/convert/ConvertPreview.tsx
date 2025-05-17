import Image from "next/image";

interface ConvertPreviewProps {
  type: "deposit-to-token" | "token-to-deposit";
  amount: string;
  depositBalance: number;
  tokenBalance: number;
}

export default function ConvertPreview({
  type,
  amount,
  depositBalance,
  tokenBalance,
}: ConvertPreviewProps) {
  const parsedAmount = Number.parseInt(amount);
  const isDepositToToken = type === "deposit-to-token";

  const labelFrom = isDepositToToken ? "토큰에서" : "예금에서";
  const labelTo = isDepositToToken ? "예금으로" : "토큰으로";
  const imageSrc = "/images/arrow-down.gif";

  const finalDeposit = isDepositToToken
    ? depositBalance + parsedAmount
    : depositBalance - parsedAmount;

  const finalToken = isDepositToToken
    ? tokenBalance - parsedAmount
    : tokenBalance + parsedAmount;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
      <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 text-center">
        전환 정보 확인
      </h2>

      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="bg-[#F5F5F5] rounded-lg p-4 w-full">
          <p className="text-sm text-[#666666] mb-1">{labelFrom}</p>
          <p
            className={`text-xl font-bold text-center ${
              isDepositToToken ? "text-red-500" : "text-blue-500"
            }`}
          >
            {" "}
            -{parsedAmount.toLocaleString()}원
          </p>
        </div>

        <Image
          src={imageSrc}
          alt="전환 이미지"
          width={30}
          height={30}
          className="w-auto h-16 object-contain"
        />

        <div className="bg-[#F5F5F5] rounded-lg p-4 w-full">
          <p className="text-sm text-[#666666] mb-1">{labelTo}</p>
          <p
            className={`text-xl font-bold text-center ${
              isDepositToToken ? "text-blue-500" : "text-red-500"
            }`}
          >
            {" "}
            +{parsedAmount.toLocaleString()}원
          </p>
        </div>
      </div>

      <div className="border-t border-[#E0E0E0] pt-4">
        {isDepositToToken ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-[#666666]">전환 후 토큰 잔액</p>
              <p className="font-bold text-[#1A1A1A]">
                {finalToken.toLocaleString()}원
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#666666]">전환 후 예금 잔액</p>
              <p className="font-bold text-[#1A1A1A]">
                {finalDeposit.toLocaleString()}원
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-[#666666]">전환 후 예금 잔액</p>
              <p className="font-bold text-[#1A1A1A]">
                {finalDeposit.toLocaleString()}원
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#666666]">전환 후 토큰 잔액</p>
              <p className="font-bold text-[#1A1A1A]">
                {finalToken.toLocaleString()}원
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

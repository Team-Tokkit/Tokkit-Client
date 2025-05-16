"use client"

interface VoucherInfoProps {
  amount: string
  validDate: string
}

export function VoucherInfo({ amount, validDate }: VoucherInfoProps) {
  const handleApply = () => {
    alert("바우처 구매하기")
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-[#666666]">구매 금액</p>
          <p className="text-xl font-bold">{amount}</p>
        </div>
        <div>
          <p className="text-sm text-[#666666]">유효기간</p>
          <p className="text-xl font-bold">{validDate}</p>
        </div>
      </div>
      <button
        className="w-full bg-[#FFB020] hover:bg-[#FF9500] text-white py-2 rounded-lg"
        onClick={handleApply}
      >
        바우처 구매하기
      </button>
    </div>
  )
}
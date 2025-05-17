import React from "react";

interface PaymentCardProps {
  voucher: {
    id: string;
    icon: React.ReactNode;
    title: string;
    balance: number;
    expiryDate: string;
    disabled?: boolean;
  };

  isSelected: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
}

export default function PaymentCard({
  voucher,
  isSelected,
  onClick,
  fullWidth = false,
}: PaymentCardProps) {
  const isToken = voucher.id === "token";

  return (
    <div
      className={`flex-shrink-0 ${fullWidth ? "w-full" : "w-[85%]"} px-2`}
      onClick={onClick}
    >
      <div
        style={{ boxSizing: "border-box" }}
        className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer
          ${isSelected ? "border-[#FFB020] border-1" : "border-gray-200 border"}
          ${isToken ? "bg-gradient-to-br from-amber-50 to-white" : "bg-white"}
          ${voucher.disabled ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <div className="flex items-center mb-3">
          <span
            className={`text-2xl mr-2 ${
              isToken
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text"
                : ""
            }`}
          >
            {voucher.icon}
          </span>
          <h4
            className={`font-medium text-[#1A1A1A] ${
              isToken
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text font-semibold"
                : ""
            }`}
          >
            {voucher.title}
          </h4>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">잔액</p>
            <p
              className={`font-bold text-lg ${
                isToken
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text"
                  : "text-[#1A1A1A]"
              }`}
            >
              {voucher.balance.toLocaleString()}원
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">만료일</p>
            <p className="text-sm text-[#1A1A1A]">{voucher.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

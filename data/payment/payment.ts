export interface Voucher {
  id: string;
  title: string;
  balance: number;
  expiryDate: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const myVouchers: Voucher[] = [
  {
    id: "token",
    title: "내 토큰",
    balance: 50000,
    expiryDate: "2025-12-31",
    icon: "🪙",
  },
  {
    id: "v1",
    title: "긴급 지원 바우처",
    balance: 30000,
    expiryDate: "2025-10-01",
    icon: "🎟️",
  },
  {
    id: "v2",
    title: "여행 바우처",
    balance: 20000,
    expiryDate: "2025-11-01",
    icon: "🎟️",
  },
  {
    id: "v3",
    title: "식사 바우처",
    balance: 15000,
    expiryDate: "2025-12-01",
    icon: "🎟️",
  },
];

export interface MyVouchers {
    id: string;
    title: string;
    balance: number;
    expiryDate: string;
    color: string;
    icon: string;
}

export const myVouchers: MyVouchers[] = [
    {
      id: "token",
      title: "토큰으로 결제",
      balance: 30000,
      expiryDate: "무기한",
      color: "#F59E0B",
      icon: "🪙",
    },
    {
      id: "v1",
      title: "문화누리 바우처",
      balance: 40000,
      expiryDate: "2025.06.17",
      color: "#4F6EF7",
      icon: "🎭",
    },
    {
      id: "v2",
      title: "취업 지원 바우처",
      balance: 50000,
      expiryDate: "2025.06.17",
      color: "#FFB020",
      icon: "💼",
    },
    {
      id: "v3",
      title: "청년 식사 바우처",
      balance: 60000,
      expiryDate: "2025.06.17",
      color: "#10B981",
      icon: "🍽️",
    },
  ]
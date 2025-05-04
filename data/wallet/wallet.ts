export interface Transaction {
  id: string;
  type: "결제" | "충전" | "환불" | "전환";
  amount: number;
  date: string;
  merchant: string;
}

export const transactions: Transaction[] = [
  {
    id: "tx-001",
    type: "결제",
    amount: 5000,
    date: "2025-04-30 15:52",
    merchant: "투썸플레이스 마산창동점",
  },
  {
    id: "tx-002",
    type: "충전",
    amount: 20000,
    date: "2025-04-29 14:52",
    merchant: "예금 전환",
  },
  {
    id: "tx-003",
    type: "결제",
    amount: 15000,
    date: "2025-04-21 13:52",
    merchant: "교보문고",
  },
  {
    id: "tx-004",
    type: "환불",
    amount: 8000,
    date: "2025-04-14 12:52",
    merchant: "올리브영",
  },
  {
    id: "tx-005",
    type: "전환",
    amount: 30000,
    date: "2025-03-26 12:52",
    merchant: "토큰 → 예금",
  },
  {
    id: "tx-006",
    type: "결제",
    amount: 12000,
    date: "2025-03-16 11:52",
    merchant: "CGV 강남",
  },
  {
    id: "tx-007",
    type: "충전",
    amount: 50000,
    date: "2025-03-06 10:52",
    merchant: "예금 전환",
  },
];

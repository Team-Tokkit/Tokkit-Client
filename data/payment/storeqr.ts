export interface StoreQRInfo {
  transactionId: string;
  storeId: string;
  merchantId: string;
  merchantName: string;
  address: string;
  logoUrl?: string;
  supportedVouchers?: string[];
}

export const mockStoreQR: Record<string, StoreQRInfo> = {
  "store-a": {
    transactionId: "store-a",
    storeId: "001",
    merchantId: "m001",
    merchantName: "스타벅스 강남점",
    address: "서울시 강남구",
    logoUrl: "/images/starbucks.jpg",
    supportedVouchers: ["token", "v3"],
  },
  "store-b": {
    transactionId: "store-b",
    storeId: "002",
    merchantId: "m002",
    merchantName: "이디야커피 역삼점",
    address: "서울시 강남구 역삼로 456",
    logoUrl: "/images/ediya.png",
    supportedVouchers: ["token", "v1"],
  },
  "store-c": {
    transactionId: "store-c",
    storeId: "003",
    merchantId: "m003",
    merchantName: "투썸플레이스 선릉점",
    address: "서울시 강남구 선릉로 789",
    logoUrl: "/images/twosome.png",
    supportedVouchers: ["token", "v2", "v3"],
  },
};

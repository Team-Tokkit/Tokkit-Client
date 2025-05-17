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
    storeId: "store-a",
    merchantId: "m001",
    merchantName: "스타벅스 강남점",
    address: "서울시 강남구 역삼로 123",
    supportedVouchers: ["token", "v3"],
  },
  "store-b": {
    transactionId: "store-b",
    storeId: "store-b",
    merchantId: "m002",
    merchantName: "이디야커피 역삼점",
    address: "서울시 강남구 역삼로 456",
    supportedVouchers: ["token", "v1"],
  },
  "store-c": {
    transactionId: "store-c",
    storeId: "store-c",
    merchantId: "m003",
    merchantName: "투썸플레이스 선릉점",
    address: "서울시 강남구 선릉로 789",
    supportedVouchers: ["token", "v2", "v3"],
  },
};

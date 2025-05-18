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
  "1": {
    transactionId: "1",
    storeId: "1",
    merchantId: "1",
    merchantName: "스타벅스 강남점",
    address: "서울시 강남구 역삼로 123",
    supportedVouchers: ["token", "v3"],
  },
  "2": {
    transactionId: "2",
    storeId: "2",
    merchantId: "2",
    merchantName: "이디야커피 역삼점",
    address: "서울시 강남구 역삼로 456",
    supportedVouchers: ["token", "v1"],
  },
  "3": {
    transactionId: "3",
    storeId: "3",
    merchantId: "3",
    merchantName: "투썸플레이스 선릉점",
    address: "서울시 강남구 선릉로 789",
    supportedVouchers: ["token", "v2", "v3"],
  },
};

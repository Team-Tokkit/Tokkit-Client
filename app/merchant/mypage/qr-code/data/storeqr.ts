export interface StoreQRInfo {
  storeId: string;
  merchantId: string;
  storeName: string;
  address: string;
}

export const mockStoreQR: Record<string, StoreQRInfo> = {
  "1": {
    storeId: "682027",
    merchantId: "109",
    storeName: "영재상사",
    address: "서울 종로구 자하문로 21 1층",
  }
};

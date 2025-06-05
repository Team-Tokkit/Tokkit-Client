export interface StoreQRInfo {
  storeId: string;
  merchantId: string;
  storeName: string;
  address: string;
}

export const mockStoreQR: Record<string, StoreQRInfo> = {
  "1": {
    storeId: "682036",
    merchantId: "126",
    storeName: "코딩 캠프",
    address: "서울 마포구 성암로 255",
  }
};

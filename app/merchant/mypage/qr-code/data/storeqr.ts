export interface StoreQRInfo {
  storeId: string;
  merchantId: string;
  storeName: string;
  address: string;
}

export const mockStoreQR: Record<string, StoreQRInfo> = {
  "1": {
    storeId: "682025",
    merchantId: "104",
    storeName: "포토이즘",
    address: "경기 양주시 옥정동로7다길 54",
  }
};

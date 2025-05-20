export interface StoreQRInfo {
  storeId: string;
  merchantId: string;
}

export const mockStoreQR: Record<string, StoreQRInfo> = {
  "1": {
    storeId: "682025",
    merchantId: "104",
  },
  "2": {
    storeId: "682026",
    merchantId: "105",
  }
};

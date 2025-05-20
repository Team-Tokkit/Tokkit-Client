export interface StoreQRInfo {
  storeId: string;
  merchantId: string;
  merchantName: string;
  address: string;
  logoUrl?: string;
  supportedVouchers?: string[];
}

export const mockStoreQR: Record<string, StoreQRInfo> = {
  "1": {
    storeId: "682025",
    merchantId: "104",
    merchantName: "이서연",
    address: "경기 양주시 옥정동로7다길 54",
    supportedVouchers: ["token", "1"],
  },
};

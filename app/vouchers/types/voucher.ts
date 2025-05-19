import { StoreResponse } from '@/types/store'
export interface Voucher {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  validDate: string
  contact?: string
  remainingCount?: number
  totalCount?: number
  imageUrl: string
  merchant?: string
}

export interface VoucherDetail {
  id: number
  name: string
  price: number
  originalPrice: number
  remainingCount: number
  validDate: string // 백엔드에서 yyyy-MM-dd 형식으로 보내므로 string
  detailDescription: string
  refundPolicy: string
  contact: string | null
  imageUrl: string | null
  stores: {
    content: StoreResponse[]
    totalPages: number
    totalElements: number
    size: number
    number: number
    first: boolean
    last: boolean
  }
}

export interface VoucherSearchParams {
  storeCategory?: string;
  searchKeyword?: string;
  sort?: string;
  direction?: string;
  page?: number;
  size?: number;
}

export interface VoucherPurchaseRequest {
  voucherId: number
  simplePassword: string
}

export interface VoucherPurchaseResponse {
  ownershipId: number
  message: string
}
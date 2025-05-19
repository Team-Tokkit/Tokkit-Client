import { StoreResponse } from '@/types/store'
export interface MyVoucher {
    id: number
    name: string
    contact: string
    originalPrice: number
    remainingAmount: number
    // isVoucher:boolean
    status: string
    validDate: string
    imageUrl: string
    
};

  export interface MyVoucherDetail {
      id: number
      voucherName: string
      voucherContact: string
      voucherValidDate: string
      voucherDetailDescription: string
      voucherRefundPolicy: string
      remainingAmount: number
      originalPrice: number
      status: string
      imageUrl: string
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

export interface MyVoucherSearchParams {
  storeCategory?: string;      
  searchKeyword?: string;      
  sort?: string;               
  direction?: string;          
  userId?: number;             
  page?: number;
  size?: number;
}
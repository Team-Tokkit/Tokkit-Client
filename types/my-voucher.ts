export interface MyVoucher {
    id: number
    title: string
    department: string
    totalAmount: number
    remainingAmount: number
    isUsed: boolean
    expiryDate: string
    image: string
    color: string
    icon: string
    paymentCount: number
  }
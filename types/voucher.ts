export interface Voucher {
  id: number // 바우처 아이디
  name: string // 바우처 이름
  description: string // 바우처 설명
  category: string // 바우처 카테고리
  price: number // 바우처 가격
  validDate: string // 유효기간 (ISO 형식의 문자열)
  detailDescription: string // 바우처 상세 설명
  stores: string[] // 가맹점 (사용처)
  refundPolicy: string // 바우처 환불 정책
  contact: string // 발급처 (문의처)
  merchant: string // 발급처 이름 (Merchant)
  image: string // 바우처 이미지
}
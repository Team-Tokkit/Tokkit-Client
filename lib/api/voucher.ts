import axios from "axios"
import type { Voucher } from "@/app/vouchers/types/voucher"
import type { MyVoucher } from "@/app/my-vouchers/types/my-voucher"

// 공통 axios 인스턴스
const API = axios.create({
  baseURL: "http://localhost:8080/api", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// 전체 바우처 조회 (리스트)
export async function getVouchers(): Promise<Voucher[]> {
  const res = await API.get("/vouchers") 
  return res.data.result.content
}

// TODO: 남은 바우처 조회

// 바우처 상세 조회하기
  export async function getVoucherDetails(id: number) {
    const res = await API.get(`/vouchers/details/${id}`)
    return res.data.result
  }

// 바우처 필터링 및 검색
export const filterVouchers = async (filters: any, page = 0, size = 15) => {
  const res = await API.get("/vouchers", {
    params: {
      ...filters,
      page,
      size,
    },
  })
  return res.data.result
}

// 바우처의 사용처 조회하기 (전체)
export const getVoucherStores = async (voucherId: number, page = 0, size = 5) => {
  const res = await API.get(`/vouchers/details/${voucherId}/stores`, {
    params: { page, size },
  })
  return res.data.result
}



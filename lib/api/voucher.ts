import axios from "axios"
import type { Voucher, VoucherSearchParams } from "@/app/vouchers/types/voucher"
import type { MyVoucher, MyVoucherDetail } from "@/app/my-vouchers/types/my-voucher"
import { getApiUrl } from "@/lib/getApiUrl"

// 공통 axios 인스턴스
const API = axios.create({
  baseURL: `${getApiUrl()}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// 전체 바우처 조회 (리스트)
export async function getVouchers(params: VoucherSearchParams = {}): Promise<{
  content: Voucher[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}> {
  const res = await API.get("/vouchers", { params })
  return res.data.result
}

// TODO: 남은 바우처 조회

// 바우처 상세 조회하기
export async function getVoucherDetails(id: number) {
  const res = await API.get(`/vouchers/details/${id}`)
  return res.data.result
}

// 바우처의 사용처 조회하기 (전체)
export const getVoucherStores = async (voucherId: number, page = 0, size = 10) => {
  const res = await API.get(`/vouchers/details/${voucherId}/stores`, {
    params: { page, size },
  })
  return res.data.result
}

// 내 바우처 조회하기 
export async function getMyVouchers(userId: number): Promise<MyVoucher[]> {
  const res = await API.get(`/my-vouchers`, { params: { userId }, })
  return res.data.result.content
}

// 내 바우처 상세 조회하기
export async function getMyDetailVouchers(voucherOwnershipId: number | string, userId: number = 10) {
  const id = Number(voucherOwnershipId)
  const res = await API.get(`/my-vouchers/details/${id}`, { params: { userId } })
  return res.data.result
}

// 내 바우처 필터링 및 검색
export const filterMyVouchers = async (filters: any, page = 0, size = 15) => {
  const res = await API.get("/my-vouchers", {
    params: {
      ...filters,
      page,
      size,
    },
  })
  return res.data.result
}

// 내 바우처 사용처 조회하기 (전체)
export const getMyVoucherStores = async (voucherOwnershipId: number, page = 0, size = 10) => {
  const userId = 10 // TODO: 예시로 하드코딩된 userId, 실제로는 로그인한 사용자의 ID를 사용해야 함
    console.log("🔍 getMyVoucherStores 요청:", { voucherOwnershipId, page, size })

  const res = await API.get(`/my-vouchers/details/${voucherOwnershipId}/stores`, {
    params: { page, size, userId },
  })
  return res.data.result
}

// 내 바우처 삭제하기
export const deleteMyVoucher = async (voucherOwnershipId: number, userId: number) => {
  const res = await API.delete(`/my-vouchers/${voucherOwnershipId}`, {
    params: { userId }, 
  })
  return res.data.result
}
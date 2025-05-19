import axios from "axios";
import type { Voucher, VoucherSearchParams,VoucherPurchaseRequest, VoucherPurchaseResponse,} from "@/app/vouchers/types/voucher";
import type { VoucherDetail } from "@/app/vouchers/types/voucher"; 
import type { MyVoucher, MyVoucherDetail, MyVoucherSearchParams } from "@/app/my-vouchers/types/my-voucher";
import { getApiUrl } from "@/lib/getApiUrl";
import { getCookie } from "@/lib/cookies";

// 공통 axios 인스턴스 
const API = axios.create({
  baseURL: `${getApiUrl()}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie("accessToken")}`,
  },
});

// 전체 바우처 조회
export async function getVouchers( params: VoucherSearchParams = {}): Promise<{
  content: Voucher[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}> {
  const res = await API.get("/vouchers", { params });
  return res.data.result;
}

// 바우처 구매하기
export async function purchaseVoucher( body: VoucherPurchaseRequest): Promise<VoucherPurchaseResponse> {
  const idempotencyKey = crypto.randomUUID();
  const res = await API.post<{ result: VoucherPurchaseResponse }>(
    "/wallet/voucher/purchase",
    body,
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
    }
  );
  return res.data.result;
}

// 바우처 상세 조회 (사용처 5개)
export async function getVoucherDetails( id: number): Promise<VoucherDetail> {
  const res = await API.get<{ result: VoucherDetail }>(
    `/vouchers/details/${id}`
  );
  return res.data.result;
}


// 바우처의 사용처 조회하기 (전체)
export const getVoucherStores = async (voucherId: number, page = 0, size = 10) => {
  const res = await API.get(`/vouchers/details/${voucherId}/stores`, {
    params: { page, size },
  })
  return res.data.result
}

// 내 바우처 조회하기 
export async function getMyVouchers(params: MyVoucherSearchParams = {}): Promise<{
  content: MyVoucher[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}> {
  const { page = 0, size = 15, searchKeyword, sort, direction } = params

  const query: Record<string, any> = { page, size }
  if (searchKeyword) query.searchKeyword = searchKeyword
  if (sort)          query.sort = sort
  if (direction)     query.direction = direction

  const res = await API.get("/my-vouchers", { params: query })
  return res.data.result
}


// 내 바우처 상세 조회하기
export async function getMyDetailVouchers(voucherOwnershipId: number | string) {
  const id = Number(voucherOwnershipId)
  const res = await API.get(`/my-vouchers/details/${id}`)
  return res.data.result
}

// 내 바우처 사용처 조회하기 (전체)
export const getMyVoucherStores = async (voucherOwnershipId: number, page = 0, size = 10) => {
  const res = await API.get(`/my-vouchers/details/${voucherOwnershipId}/stores`, {
    params: { page, size},
  })
  return res.data.result
}

// 내 바우처 삭제하기
export const deleteMyVoucher = async (voucherOwnershipId: number) => {
  const res = await API.delete(`/my-vouchers/${voucherOwnershipId}`)
  return res.data.result
}
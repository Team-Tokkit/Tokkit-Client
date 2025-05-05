import axios from "axios"

// axios 인스턴스 생성
const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// 바우처 조회하기
export const getVouchers = async () => {
  const res = await API.get("/vouchers")
  return res.data.result 
}

// TODO: 바우처 상세 조회하기
// export const getVoucherDetails = async (id: string) => {
//   const res = await API.get(`/vouchers/${id}`)
//   return res.data.result
// }

// TODO: 바우처 필터링 및 검색
// export const filterVouchers = async (filters: any) => {
//   const res = await API.get("/vouchers", { params: filters })
//   return res.data.result
// }


// 내 바우처 조회하기
// export const getVouchers = async () => {
//   const res = await API.get("/my-vouchers")
//   return res.data.result 
// }

// 내 바우처 상세 조회하기
// export const getVouchers = async () => {
//   const res = await API.get("/my-vouchers/{ id}")
//   return res.data.result 
// }


// 매장 정보 타입 - 백엔드 응답 형식에 맞게 수정
export interface Store {
    id: number
    name: string
    roadAddress: string
    newZipCode: string
    latitude: number
    longitude: number
    distance: number
    storeCategory: string
}


export interface StoreSearchParams {
    lat: number
    lng: number
    radius: number
    storeCategory?: string
    keyword?: string
}



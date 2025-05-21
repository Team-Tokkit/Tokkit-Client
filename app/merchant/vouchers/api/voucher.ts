import { getApiUrl } from "@/lib/getApiUrl";
import { getCookie } from "@/lib/cookies";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { VoucherSearchParams } from "@/app/merchant/vouchers/types/voucher";

const API_URL = getApiUrl();

// 전체 바우처 조회 및 검색 API
export async function getVouchers({ keyword = "", page = 0, size = 10 }: VoucherSearchParams) {

    const token = getCookie("accessToken");
    if (!token) throw new Error("accessToken 없음");

    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append("keyword", keyword);
    queryParams.append("page", String(page));
    queryParams.append("size", String(size));

    const res = await fetchWithAuth(`${API_URL}/api/merchants/vouchers?${queryParams}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`바우처 조회 실패: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    return data.result;
}


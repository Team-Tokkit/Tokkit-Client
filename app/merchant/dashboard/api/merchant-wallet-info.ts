import { getApiUrl } from "@/lib/getApiUrl";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export async function fetchMerchantWalletInfo() {
  const res = await fetchWithAuth(`${API_URL}/api/merchants/wallet/balance`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("가맹점주 지갑 정보를 불러오지 못했습니다.");

  const data = await res.json();

  const parsedResult =
      typeof data.result === "string" ? JSON.parse(data.result) : data.result;

  return parsedResult;
}
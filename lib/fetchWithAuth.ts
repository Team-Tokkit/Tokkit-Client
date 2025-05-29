import { getCookie, setCookie, deleteCookie } from "@/lib/cookies"
import { getApiUrl } from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
    let accessToken = getCookie("accessToken")
    let refreshToken = getCookie("refreshToken")

    let res = await fetch(input, {
        ...init,
        headers: {
            ...(init.headers || {}),
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    })

    if (res.status === 401 && accessToken && refreshToken) {
        try {
            const retry = await fetch(`${API_URL}/api/auth/reissue`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ accessToken, refreshToken }),
            })

            if (retry.ok) {
                const data = await retry.json()
                const newAccessToken = data.result.accessToken
                setCookie("accessToken", newAccessToken)

        // 재요청
        res = await fetch(input, {
          ...init,
          headers: {
            ...(init.headers || {}),
            Authorization: `Bearer ${newAccessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
      } else {
        alert("장시간 활동이 없어 세션이 만료되었습니다. 다시 로그인 해주세요.")
        deleteCookie("accessToken")
        deleteCookie("refreshToken")
        window.location.href = "/login"
      }
    } catch (err) {
      console.error("토큰 재발급 실패", err)
      alert("장시간 활동이 없어 세션이 만료되었습니다. 다시 로그인 해주세요.")
      deleteCookie("accessToken")
      deleteCookie("refreshToken")
      window.location.href = "/login"
    }
  }

    return res
}

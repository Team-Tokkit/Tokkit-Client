"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const isMerchantPage = pathname.startsWith("/merchant");
        const res = await fetchWithAuth(isMerchantPage ? "/api/merchants/roles" : "/api/users/roles", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`역할 요청 실패 (status: ${res.status})`);
        }

        const data = await res.json();
        const role = data?.result?.roles;

        if ((isMerchantPage && role !== "ROLE_MERCHANT") || (!isMerchantPage && role !== "ROLE_USER")) {
          console.warn("역할 불일치로 리다이렉트");
          router.replace(isMerchantPage ? "/merchant/login" : "/login");
        }
      } catch (err) {
        console.error("역할 확인 실패:", err);
        router.replace(pathname.startsWith("/merchant") ? "/merchant/login" : "/login");
      }
    };

    const protectedRoutes = [
      "/dashboard",
      "/mypage",
      "/wallet",
      "/vouchers",
      "/payment",
      "/notifications",
      "/merchant/dashboard",
      "/merchant/wallet",
      "/merchant/notifications",
      "/merchant/mypage",
    ];
    const shouldProtect = protectedRoutes.some((route) => pathname.startsWith(route));

    if (shouldProtect) {
      // 로그인 후 쿠키가 완전히 반영될 수 있도록 약간의 지연 삽입 (또는 next/router wait)
      setTimeout(checkRole, 100);
    }
  }, [pathname]);

  const isAdmin = pathname.startsWith("/admin");
  return <div className={isAdmin ? "w-full" : "max-w-md mx-auto"}>{children}</div>;
}

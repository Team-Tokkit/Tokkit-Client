import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import parseJwt from "@/lib/parseJwt";

// 보호 경로 패턴
const protectedPaths = [
    "/dashboard",
    "/mypage",
    "/vouchers",
    "/my-vouchers",
    "/notice",
    "/notifications",
    "/offline-stores",
    "/payment",
    "/wallet",
    "/merchant/dashboard",
    "/merchant/wallet",
    "/merchant/notifications",
    "merchant/mypage"

];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken");
    const pathname = request.nextUrl.pathname;

    const isUserProtected = protectedPaths.some(
        (path) => !path.startsWith("/merchant") && pathname.startsWith(path)
    );
    const isMerchantProtected = protectedPaths.some(
        (path) => path.startsWith("/merchant") && pathname.startsWith(path)
    );

    // 보호 경로인데 토큰이 없으면 리다이렉트
    if ((isUserProtected || isMerchantProtected) && !token) {
        const redirectUrl = isMerchantProtected
            ? "/merchant/login"
            : "/login";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // 토큰이 존재하면 role까지 확인
    if (token) {
        const payload = parseJwt(token.value);
        const role = payload?.role;

        if (isUserProtected && role !== "USER") {
            // 가맹점주가 일반 유저 보호 페이지 접근 시 → 일반 로그인 페이지로
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (isMerchantProtected && role !== "MERCHANT") {
            // 일반 유저가 가맹점 보호 페이지 접근 시 → 가맹점 로그인 페이지로
            return NextResponse.redirect(new URL("/merchant/login", request.url));
        }
    }

    return NextResponse.next();
}

// matcher 설정
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/mypage/:path*",
        "/vouchers/:path*",
        "/my-vouchers/:path*",
        "/notice/:path*",
        "/notifications/:path*",
        "/offline-stores/:path*",
        "/payment/:path*",
        "/wallet/:path*",
        "/merchant/dashboard/:path*",
        "/merchant/wallet/:path*",
        "/merchant/notifications/:path*",
        "/merchant/mypage/:path*",
    ],
};
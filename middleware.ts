import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
    "/merchant/mypage",
    "/merchant/vouchers",
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

    // 보호 경로인데 토큰이 없으면 로그인 페이지로 리다이렉트
    if ((isUserProtected || isMerchantProtected) && !token) {
        const redirectUrl = isMerchantProtected ? "/merchant/login" : "/login";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // 토큰이 있으면 바로 통과 (role은 프론트에서 /me API로 확인)
    return NextResponse.next();
}

// matcher 설정
export const config = {
    matcher: protectedPaths.map((path) => `${path}/:path*`),
};

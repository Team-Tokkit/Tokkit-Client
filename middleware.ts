import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호 경로 설정
const protectedPaths = ["/dashboard", "/mypage", "/notice", "/offline-stores"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken");

    const pathname = request.nextUrl.pathname;

    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// matcher 설정
export const config = {
    matcher: ["/dashboard/:path*", "/mypage/:path*", "/wallet/:path*"],
};

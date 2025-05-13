import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // 개발 서버에서 /api 요청을 백엔드 서버로 프록시 (개발 중 CORS 해결용)
    async rewrites() {
        return [
            {
                source: "/api/:path*", // 프론트에서 호출할 경로
                destination: "http://localhost:8080/api/:path*", // 백엔드 서버 주소
            },
        ];
    },
};

export default nextConfig;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function ProtectedComponent(props: P) {
        const router = useRouter();

        useEffect(() => {
            const accessToken = getCookie("accessToken");

            // 토큰 없으면 로그인으로
            if (!accessToken) {
                router.replace("/login");
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
}

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

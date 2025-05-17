export function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(name: string, value: string, maxAge = 3600) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`
}
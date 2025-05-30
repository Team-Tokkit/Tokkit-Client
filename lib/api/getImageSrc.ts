// lib/getImageSrc.ts
export const getImageSrc = (imageUrl: string) => {
    // 이미 http로 시작하면 그대로 반환
    if (imageUrl.startsWith("http")) return imageUrl;
  
    // 환경에 따라 baseUrl 결정
    const mode = process.env.NEXT_PUBLIC_MODE;
    let baseUrl = "";
  
    if (mode === "prod") {
        baseUrl = process.env.NEXT_PUBLIC_PROD_SERVER || "";
      } else {
        baseUrl = process.env.NEXT_PUBLIC_LOCAL_SERVER || "http://localhost:8080";
      }
  
    // baseUrl 마지막에 /가 있으면 제거
    if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
  
    // imageUrl 앞에 /가 있으면 제거
    const cleanImageUrl = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  
    // 최종 URL 반환
    return `${baseUrl}/api/s3/${cleanImageUrl}`;
  };
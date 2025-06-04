export const getImageSrc = (imageUrl: string) => {
    if (imageUrl.startsWith("http")) return imageUrl;
  
    const mode = process.env.NEXT_PUBLIC_MODE;
    let baseUrl = "";
  
    if (mode === "prod") {
        baseUrl = process.env.NEXT_PUBLIC_PROD_SERVER || "";
      } else {
        baseUrl = process.env.NEXT_PUBLIC_LOCAL_SERVER || "http://localhost:8080";
      }
  
    if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
  
    const cleanImageUrl = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  
    return `${baseUrl}/api/s3/${cleanImageUrl}`;
  };
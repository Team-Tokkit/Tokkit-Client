export interface OcrResponse {
    name: string;
    residentId: string; // ex: "123456-1******"
    issueDate: string;  // ex: "2020.01.01"
}

export async function extractIdCardInfo(imageFile: File): Promise<OcrResponse> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch("/api/ocr/idCard", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("OCR 요청 실패");
    }

    const json = await res.json();
    return {
        name: json.result.name,
        residentId: json.result.rrnFront + json.result.rrnBack,
        issueDate: json.result.issuedDate,
    };
}

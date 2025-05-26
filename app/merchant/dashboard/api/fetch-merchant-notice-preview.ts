import { getApiUrl } from "@/lib/getApiUrl";
import { getCookie } from "@/lib/cookies";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export interface NoticePreview {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    isNew: boolean;
}

export async function fetchNoticePreview(limit: number = 3): Promise<NoticePreview[]> {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/notice?page=0`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) throw new Error("공지사항을 불러오는 데 실패했습니다.");

    const data = await res.json();
    const raw = data.result.content || [];

    const now = new Date();
    const formattedNotices = raw.map((n: any) => {
        const createdAt = new Date(n.createdAt);
        const diffInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

        return {
            id: n.id,
            title: n.title,
            content: n.content,
            createdAt: n.createdAt,
            isNew: diffInDays <= 3,
        };
    });

    return formattedNotices.slice(0, limit);
}

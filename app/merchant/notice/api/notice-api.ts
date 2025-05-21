import axios from "axios";
import { getApiUrl } from "@/lib/getApiUrl";
import {fetchWithAuth} from "@/lib/fetchWithAuth";

const API_URL = getApiUrl();

export interface Notice {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export interface NoticeDetail {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export interface FetchNoticeListResult {
    content: Notice[];
    totalPages: number;
}

export async function fetchNoticeList(currentPage: number): Promise<FetchNoticeListResult> {
    const response = await fetchWithAuth(`${API_URL}/api/merchants/notice?page=${currentPage}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("공지사항 목록을 불러오는 데 실패했습니다.");
    }

    const data = await response.json();
    const result = typeof data.result === "string" ? JSON.parse(data.result) : data.result;

    return {
        content: result.content || [],
        totalPages: result.totalPages || 1,
    };
}

export async function fetchNoticeDetail(id: string): Promise<NoticeDetail> {
    const response = await fetchWithAuth(`${API_URL}/api/merchants/notice/${id}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();
    const result = typeof data.result === "string" ? JSON.parse(data.result) : data.result;

    return result;
}
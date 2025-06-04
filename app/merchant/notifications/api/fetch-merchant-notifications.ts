"use client"

import { fetchWithAuth } from "@/lib/fetchWithAuth"
import {getApiUrl} from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export interface Notification {
    id: string
    type: "system" | "payment" | "token"
    title: string
    message: string
    createdAt: string
    deleted: "active" | "deleted"
}

export async function fetchMerchantNotifications(): Promise<Notification[]> {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/notifications`, { method: "GET" });
    const json = await res.json();

    return json.result.map((n: any) => ({
        id: n.id,
        type: n.category.toLowerCase(),
        title: n.title,
        message: n.content,
        createdAt: n.createdAt,
        deleted: n.deleted,
    }));
}

"use client"

import { fetchWithAuth } from "@/lib/fetchWithAuth"
import {getApiUrl} from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export interface NotificationCategorySetting {
    category: "SYSTEM" | "PAYMENT" | "TOKEN"
    enabled: boolean
}

export async function fetchMerchantNotificationSettings(): Promise<NotificationCategorySetting[]> {
    const res = await fetchWithAuth(`${API_URL}/api/merchants/notifications/setting`, {
        method: "GET",
    })
    const json = await res.json()
    return json.result
}
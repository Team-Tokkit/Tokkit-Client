"use client"

import { fetchWithAuth } from "@/lib/fetchWithAuth"
import {getApiUrl} from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export interface NotificationCategorySetting {
    category: "SYSTEM" | "PAYMENT" | "TOKEN"
    enabled: boolean
}

export async function updateNotificationSettings(settings: NotificationCategorySetting[]): Promise<void> {
    await fetchWithAuth(`${API_URL}/api/users/notifications/setting`, {
        method: "PUT",
        body: JSON.stringify(settings),
    });
}
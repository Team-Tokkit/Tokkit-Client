"use client"

import { fetchWithAuth } from "@/lib/fetchWithAuth"
import {getApiUrl} from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export async function deleteNotification(id: string): Promise<void> {
    await fetchWithAuth(`${API_URL}/api/users/notifications/${id}`, {
        method: "DELETE",
    });
}
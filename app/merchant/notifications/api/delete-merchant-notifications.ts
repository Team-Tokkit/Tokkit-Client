"use client"

import { fetchWithAuth } from "@/lib/fetchWithAuth"
import {getApiUrl} from "@/lib/getApiUrl";

const API_URL = getApiUrl();

export async function deleteMerchantNotification(id: string): Promise<void> {
    await fetchWithAuth(`${API_URL}/api/merchants/notifications/${id}`, {
        method: "DELETE",
    });
}
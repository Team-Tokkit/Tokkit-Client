"use client"

import { useEffect, useState } from "react"
import { CreditCard, Shield, Megaphone, Bell, AlertCircle, Wallet, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import NotificationSettingsHeader from "@/app/notifications/settings/components/NotificationSettingHeader"
import NotificationSettingItem from "@/app/notifications/settings/components/NotificationSettingItem"
import NotificationSettingsSkeleton from "@/app/notifications/settings/components/NotificationSettingSkeleton"
import NotificationPolicyInfo from "@/app/notifications/settings/components/NotificationPolicyInfo"
import { fetchNotificationSettings } from "@/app/notifications/settings/api/fetch-notification-setting"
import { updateNotificationSettings } from "@/app/notifications/settings/api/update-notification-setting"
import LoadingOverlay from "@/components/common/LoadingOverlay";

interface NotificationSettings {
    SYSTEM: boolean
    PAYMENT: boolean
    VOUCHER: boolean
    TOKEN: boolean
}

export default function NotificationSettingsPage() {
    const [settings, setSettings] = useState<NotificationSettings>({
        SYSTEM: true,
        PAYMENT: true,
        VOUCHER: true,
        TOKEN: true,
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const load = async () => {
            setIsLoading(true)
            try {
                const result = await fetchNotificationSettings()
                const mapped = result.reduce((acc, cur) => {
                    acc[cur.category] = cur.enabled
                    return acc
                }, {} as NotificationSettings)
                setSettings(mapped)
            } catch (e) {
                console.error("알림 설정 불러오기 실패", e)
            } finally {
                setIsLoading(false)
            }
        }

        load()
    }, [])

    const handleAllChange = (checked: boolean) => {
        setSettings({
            SYSTEM: checked,
            PAYMENT: checked,
            VOUCHER: checked,
            TOKEN: checked,
        })
    }

    const handleSettingChange = (category: keyof NotificationSettings, checked: boolean) => {
        setSettings(prev => ({ ...prev, [category]: checked }))
    }

    const saveSettings = async () => {
        setIsSaving(true)
        try {
            const body = Object.entries(settings).map(([category, enabled]) => ({
                category: category as "SYSTEM" | "PAYMENT" | "VOUCHER" | "TOKEN",
                enabled,
            }))
            await updateNotificationSettings(body)

            toast({
                title: "설정이 저장되었습니다",
                description: "알림 설정이 성공적으로 업데이트되었습니다.",
            })
        } catch (e) {
            console.error("저장 실패:", e)
            toast({
                title: "설정 저장 실패",
                description: "다시 시도해주세요.",
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] flex flex-col">
            <NotificationSettingsHeader />

            <div className="flex-1 p-4">
                <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm">
                    {isLoading ? (
                        <NotificationSettingsSkeleton />
                    ) : (
                        <>
                            <NotificationSettingItem
                                icon={Bell}
                                iconColor="text-red-500"
                                iconBg="bg-red-100"
                                title="모든 알림"
                                description="모든 알림을 한 번에 설정합니다"
                                checked={
                                    settings.SYSTEM &&
                                    settings.PAYMENT &&
                                    settings.VOUCHER &&
                                    settings.TOKEN
                                }
                                onChange={handleAllChange}
                                ariaLabel="모든 알림 설정"
                            />
                            <Separator className="my-1" />
                            <NotificationSettingItem
                                icon={AlertCircle}
                                iconColor="text-blue-500"
                                iconBg="bg-blue-100"
                                title="시스템"
                                description="시스템 관련 알림"
                                checked={settings.SYSTEM}
                                onChange={(c) => handleSettingChange("SYSTEM", c)}
                                ariaLabel="시스템 알림 설정"
                            />
                            <Separator className="my-1" />
                            <NotificationSettingItem
                                icon={CreditCard}
                                iconColor="text-green-500"
                                iconBg="bg-green-100"
                                title="결제"
                                description="결제 관련 알림"
                                checked={settings.PAYMENT}
                                onChange={(c) => handleSettingChange("PAYMENT", c)}
                                ariaLabel="결제 알림 설정"
                            />
                            <Separator className="my-1" />
                            <NotificationSettingItem
                                icon={Wallet}
                                iconColor="text-purple-500"
                                iconBg="bg-purple-100"
                                title="바우처"
                                description="바우처 관련 알림"
                                checked={settings.VOUCHER}
                                onChange={(c) => handleSettingChange("VOUCHER", c)}
                                ariaLabel="바우처 알림 설정"
                            />
                            <Separator className="my-1" />
                            <NotificationSettingItem
                                icon={Coins}
                                iconColor="text-amber-500"
                                iconBg="bg-amber-100"
                                title="토큰"
                                description="토큰 전환, 충전 관련 알림"
                                checked={settings.TOKEN}
                                onChange={(c) => handleSettingChange("TOKEN", c)}
                                ariaLabel="토큰 알림 설정"
                            />
                        </>
                    )}
                </div>

                <NotificationPolicyInfo />

                <div className="mt-6">
                    <Button
                        className="w-full bg-[#FFB020] hover:bg-[#F9A826] text-white"
                        onClick={saveSettings}
                        disabled={isLoading || isSaving}
                    >
                        {isSaving ? "저장 중..." : "설정 저장"}
                    </Button>
                </div>
                {isSaving && <LoadingOverlay message="알림 설정을 저장 중입니다..." />}
            </div>
        </div>
    )
}

"use client"

import { useEffect, useState } from "react"
import { CreditCard, Shield, Megaphone, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import NotificationSettingsHeader from "@/app/notifications/settings/components/NotificationSettingHeader"
import NotificationSettingItem from "@/app/notifications/settings/components/NotificationSettingItem"
import NotificationSettingsSkeleton from "@/app/notifications/settings/components/NotificationSettingSkeleton"
import NotificationPolicyInfo from "@/app/notifications/settings/components/NotificationPolicyInfo"

interface NotificationSettings {
    allNotifications: boolean
    tokenAndPayment: boolean
    security: boolean
    activityAndNews: boolean
}

export default function NotificationSettingsPage() {
    const [settings, setSettings] = useState<NotificationSettings>({
        allNotifications: true,
        tokenAndPayment: true,
        security: true,
        activityAndNews: true,
    })
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true)
            try {
                const saved = localStorage.getItem("notificationSettings")
                if (saved) {
                    setSettings(JSON.parse(saved))
                }
                setIsLoading(false)
            } catch (e) {
                console.error("설정 로딩 실패:", e)
                setIsLoading(false)
            }
        }
        fetchSettings()
    }, [])

    const handleAllChange = (checked: boolean) => {
        setSettings({
            allNotifications: checked,
            tokenAndPayment: checked,
            security: checked,
            activityAndNews: checked,
        })
    }

    const handleSettingChange = (key: keyof NotificationSettings, checked: boolean) => {
        setSettings(prev => {
            const updated = { ...prev, [key]: checked }
            const allEnabled = updated.tokenAndPayment && updated.security && updated.activityAndNews
            return { ...updated, allNotifications: allEnabled }
        })
    }

    const saveSettings = async () => {
        setIsSaving(true)
        try {
            localStorage.setItem("notificationSettings", JSON.stringify(settings))
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
                                iconColor="text-blue-500"
                                iconBg="bg-blue-100 dark:bg-blue-900/20"
                                title="모든 알림"
                                description="모든 알림을 한 번에 설정합니다"
                                checked={settings.allNotifications}
                                onChange={handleAllChange}
                                ariaLabel="모든 알림 설정"
                            />
                            <Separator className="my-1" />

                            <NotificationSettingItem
                                icon={CreditCard}
                                iconColor="text-green-500"
                                iconBg="bg-green-100 dark:bg-green-900/20"
                                title="토큰 및 결제"
                                description="토큰 전환, 결제, 충전 관련 알림"
                                checked={settings.tokenAndPayment}
                                onChange={(c) => handleSettingChange("tokenAndPayment", c)}
                                ariaLabel="토큰 및 결제 알림 설정"
                            />
                            <Separator className="my-1" />

                            <NotificationSettingItem
                                icon={Shield}
                                iconColor="text-red-500"
                                iconBg="bg-red-100 dark:bg-red-900/20"
                                title="보안"
                                description="로그인, 비밀번호 변경, 보안 관련 알림"
                                checked={settings.security}
                                onChange={(c) => handleSettingChange("security", c)}
                                ariaLabel="보안 알림 설정"
                            />
                            <Separator className="my-1" />

                            <NotificationSettingItem
                                icon={Megaphone}
                                iconColor="text-purple-500"
                                iconBg="bg-purple-100 dark:bg-purple-900/20"
                                title="활동 및 소식"
                                description="이벤트, 프로모션, 서비스 업데이트 알림"
                                checked={settings.activityAndNews}
                                onChange={(c) => handleSettingChange("activityAndNews", c)}
                                ariaLabel="활동 및 소식 알림 설정"
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
            </div>
        </div>
    )
}

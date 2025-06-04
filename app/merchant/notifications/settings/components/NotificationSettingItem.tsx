"use client"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SettingItemProps {
    icon: LucideIcon
    iconColor: string
    iconBg: string
    title: string
    description: string
    checked: boolean
    onChange: (checked: boolean) => void
    ariaLabel: string
}

export default function NotificationSettingItem({
                                                    icon: Icon,
                                                    iconColor,
                                                    iconBg,
                                                    title,
                                                    description,
                                                    checked,
                                                    onChange,
                                                    ariaLabel,
                                                }: SettingItemProps) {
    return (
        <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-3", iconBg)}>
                    <Icon className={cn("h-5 w-5", iconColor)} />
                </div>
                <div>
                    <h3 className="font-medium text-[#1A1A1A]">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
            <Switch checked={checked} onCheckedChange={onChange} aria-label={ariaLabel} />
        </div>
    )
}

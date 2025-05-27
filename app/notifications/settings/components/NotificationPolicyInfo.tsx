"use client"

import {Clock7} from "lucide-react"

export default function NotificationPolicyInfo() {
    return (
        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Clock7 className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                    <h3 className="font-medium text-[#1A1A1A]">알림 보관 정책</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        알림은 30일 동안 보관되며, 이후에는 자동으로 삭제됩니다. <br /> 삭제된 알림은 복구할 수 없습니다.
                    </p>
                </div>
            </div>
        </div>
    )
}

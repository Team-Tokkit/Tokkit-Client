import {AlertCircle, Bell, Coins, CreditCard} from "lucide-react"

type NotificationType = "system" | "payment" | "token"

export default function NotificationIcon({ type }: { type: NotificationType }) {
    switch (type) {
        case "system":
            return <AlertCircle className="h-5 w-5 text-blue-500" />
        case "payment":
            return <CreditCard className="h-5 w-5 text-green-500" />
        case "token":
            return <Coins className="h-5 w-5 text-amber-500" />
        default:
            return <Bell className="h-5 w-5 text-gray-500" />
    }
}

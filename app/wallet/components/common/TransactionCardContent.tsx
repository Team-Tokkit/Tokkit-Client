import {
    ArrowDownUp,
    ArrowDown,
    ArrowUp,
    Repeat,
    ShoppingCart,
    CornerUpLeft,
    Gift, AlarmClock,
} from "lucide-react";

interface Props {
    displayDescription: string;
    amount: number;
    createdAt: string;
    type: string;
    disableClick?: boolean;
}

export default function TransactionCardContent({
                                                   displayDescription,
                                                   amount,
                                                   createdAt,
                                                   type,
                                               }: Props) {

    const typeMeta = {
        CONVERT: {
            icon: <Repeat className="text-blue-500 h-5 w-5" />,
            bg: "bg-blue-100",
            color: "text-blue-500",
            sign: "", // 변환은 부호 없이
        },
        PURCHASE: {
            icon: <ShoppingCart className="text-red-500 h-5 w-5" />,
            bg: "bg-red-100",
            color: "text-red-500",
            sign: "-",
        },
        RECEIVE: {
            icon: <Gift className="text-green-500 h-5 w-5" />,
            bg: "bg-green-100",
            color: "text-green-500",
            sign: "+",
        },
        AUTO_CONVERT: {
            icon: <AlarmClock className="text-amber-500 h-5 w-5" />,
            bg: "bg-amber-100",
            color: "text-amber-500",
            sign: "",
        },
    }[type] || {
        icon: <ArrowDownUp className="text-gray-500 h-5 w-5" />,
        bg: "bg-gray-100",
        color: "text-gray-500",
        sign: "",
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center overflow-hidden w-full">
                <div
                    className={`w-12 aspect-square rounded-full flex items-center justify-center mr-3 border border-white shadow-sm ${typeMeta.bg}`}
                >
                    {typeMeta.icon}
                </div>
                <div className="min-w-0 w-full"> {/* 줄임처리 핵심 */}
                    <p className="font-medium text-[#1A1A1A] truncate w-full">
                        {displayDescription}
                    </p>
                    <p className="text-xs text-[#666666]">
                        {new Date(createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className={`font-bold ${typeMeta.color} whitespace-nowrap ml-2`}>
                {typeMeta.sign}
                {Math.abs(amount).toLocaleString()} TKT
            </div>
        </div>

    );
}

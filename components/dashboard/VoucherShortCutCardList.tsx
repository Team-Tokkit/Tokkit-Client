import { FileText, History, MapPin } from "lucide-react"
import VoucherShortcutCard from "@/components/dashboard/VoucherShortcutCard"

export default function VoucherShortcutList() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <VoucherShortcutCard
                icon={<FileText className="h-5 w-5 text-[#FFB020]" />}
                title="바우처 구매하기"
                description="새로운 바우처 구매"
                href="/vouchers"
                color="#FFB020"
            />
            <VoucherShortcutCard
                icon={<History className="h-5 w-5 text-[#10B981]" />}
                title="내 바우처 바로가기"
                description="보유한 바우처 확인"
                href="/my-vouchers"
                color="#10B981"
            />
            <VoucherShortcutCard
                icon={<MapPin className="h-5 w-5 text-[#4F6EF7]" />}
                title="오프라인 사용처"
                description="가맹점 위치 조회"
                href="/offline-stores"
                color="#4F6EF7"
            />
        </div>
    )
}

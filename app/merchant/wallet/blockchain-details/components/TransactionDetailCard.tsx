"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"
import {BlockchainTransaction} from "@/app/wallet/blockchain-details/types/blockchain";

interface Props {
    transaction: BlockchainTransaction
}

export function TransactionDetailCard({ transaction }: Props) {
    const [showMoreDetails, setShowMoreDetails] = useState(false)

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* 거래 해시 */}
            <DetailRow
                label="거래 해시"
                value={transaction.hash}
            />

            {/* 상태 */}
            <DetailRowStatus label="상태" status={transaction.status} />

            {/* 블록 */}
            <DetailRowBlock
                label="블록"
                block={transaction.block}
                confirmations={transaction.confirmations}
            />

            {/* 타임스탬프 */}
            <DetailRowIcon
                label="타임스탬프"
                icon={<Clock className="w-4 h-4 text-gray-400" />}
                value={transaction.timestamp}
            />

            {/* From / To */}
            <DetailRow
                label="보낸 사람"
                value={transaction.from}
                color="orange"
            />
            <DetailRow
                label="받는 사람"
                value={transaction.to}
                color="orange"
                background
            />

            {/* + 더보기 */}
            <div className="px-4 py-4">
                <button
                    onClick={() => setShowMoreDetails(!showMoreDetails)}
                    className="text-sm font-normal text-[#FFB020]"
                >
                    추가 정보: <span className="underline">{showMoreDetails ? "접기" : "+ 더 보기"}</span>
                </button>

                {showMoreDetails && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm">
                        <DetailInfo label="Gas 사용량" value={transaction.gasUsed.toLocaleString()} />
                        <DetailInfo label="Gas 한도" value={transaction.gasLimit.toLocaleString()} />
                        <DetailInfo label="Gas 가격" value={`${transaction.gasPrice} Gwei`} />
                        <DetailInfo label="Nonce" value={transaction.nonce} />
                    </div>
                )}
            </div>
        </div>
    )
}

// === 내부 컴포넌트 ===

function DetailRow({
                       label,
                       value,
                       background = false,
                       color = "default",
                   }: {
    label: string
    value: string
    background?: boolean
    color?: "orange" | "default"
}) {
    return (
        <div className={`flex flex-col px-4 py-4 border-b border-gray-100 ${background ? "bg-gray-50" : ""}`}>
            <LabelWithIcon text={label} />
            <div className={`mt-1 break-all font-mono text-xs ${color === "orange" ? "text-[#FFB020]" : "text-[#111827]"}`}>
                {value}
            </div>
        </div>
    )
}

function DetailRowStatus({ label, status }: { label: string; status: string }) {
    return (
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-gray-50">
            <LabelWithIcon text={label} />
            <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                성공
            </Badge>
        </div>
    )
}

function DetailRowBlock({ label, block, confirmations }: {
    label: string
    block: number
    confirmations: number
}) {
    return (
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <LabelWithIcon text={label} />
            <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-[#FFB020] font-medium text-sm">{block}</span>
                <span className="text-gray-500 text-xs">{confirmations} 확인</span>
            </div>
        </div>
    )
}

function DetailRowIcon({ label, icon, value }: {
    label: string
    icon: React.ReactNode
    value: string
}) {
    return (
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-gray-50">
            <LabelWithIcon text={label} />
            <div className="flex items-center gap-2 text-sm text-[#111827]">
                {icon}
                <span>{value}</span>
            </div>
        </div>
    )
}

function SimpleRow({ label, right, background = false }: {
    label: string
    right: React.ReactNode
    background?: boolean
}) {
    return (
        <div className={`flex items-center justify-between px-4 py-4 border-b border-gray-100 ${background ? "bg-gray-50" : ""}`}>
            <LabelWithIcon text={label} />
            {right}
        </div>
    )
}

function DetailInfo({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B7280]">{label}:</span>
            <span className="text-sm font-medium text-[#111827]">{value}</span>
        </div>
    )
}

function LabelWithIcon({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                <span className="text-xs text-gray-500">?</span>
            </div>
            <span className="text-sm text-[#6B7280]">{text}:</span>
        </div>
    )
}

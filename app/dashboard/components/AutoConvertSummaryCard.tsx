"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchAutoConvertSetting } from "@/app/mypage/auto-convert/api/fetch-auto-convert"
import { ArrowRight } from "lucide-react"

export default function AutoConvertSummaryCard() {
    const router = useRouter()
    const [enabled, setEnabled] = useState(false)
    const [dayOfMonth, setDayOfMonth] = useState<number | null>(null)
    const [hour, setHour] = useState<number | null>(null)
    const [minute, setMinute] = useState<number | null>(null)
    const [amount, setAmount] = useState<number | null>(null)

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const res = await fetchAutoConvertSetting()
                setEnabled(res.enabled)
                setDayOfMonth(res.dayOfMonth)
                setHour(res.hour)
                setMinute(res.minute)
                setAmount(res.amount)
            } catch (err) {
                console.error("자동 전환 설정 조회 실패", err)
                setEnabled(false)
                setDayOfMonth(null)
                setHour(null)
                setMinute(null)
                setAmount(null)
            }
        }

        fetchSetting()
    }, [])

    return (
        <div className="bg-[#FFFDF6] border border-[#F5A623]/30 rounded-xl px-4 py-3 flex items-start gap-3 shadow-sm mb-5">
            {/* 마스코트 이미지 */}
            <div className="w-10 h-10 relative mt-1 flex-shrink-0">
                <Image
                    src="/images/fast-transfer.png"
                    alt="자동 전환 마스코트"
                    fill
                    className="object-contain"
                />
            </div>

            {/* 텍스트 + 버튼 */}
            <div className="flex flex-row justify-between items-center w-full gap-2">
                <div className="flex-1 min-w-0">
                    {enabled ? (
                        <>
                            <p className="text-sm font-semibold text-[#E65100] mb-0.5">
                                자동 전환 활성화됨
                            </p>
                            <p className="text-xs text-[#A35B00] leading-relaxed">
                                매월{" "}
                                <strong>{dayOfMonth ?? "-"}일</strong>{" "}
                                <strong>{hour ?? "--"}시 {minute ?? "--"}분</strong>에{" "}
                                <strong>{amount !== null ? amount.toLocaleString() : "-"}원</strong> 전환됩니다.
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-sm font-semibold text-[#E65100] mb-0.5">
                                자동 전환을 설정해보세요!
                            </p>
                            <p className="text-xs text-[#A35B00] leading-relaxed">
                                예금을 원하는 날짜에 자동으로 토큰으로 전환해드려요.
                            </p>
                        </>
                    )}
                </div>

                <Button
                    size="icon"
                    variant="ghost"
                    className="text-[#F5A623] hover:text-[#E6941A] p-2 flex-shrink-0"
                    onClick={() => router.push("/mypage/auto-convert")}
                >
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}

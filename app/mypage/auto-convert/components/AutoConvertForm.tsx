"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Info } from "lucide-react"
import { updateAutoConvertSetting } from "@/app/mypage/auto-convert/api/fetch-auto-convert"

interface AutoConvertSettingRequest {
    enabled: boolean
    dayOfMonth: number | null
    hour: number | null
    minute: number | null
    amount: number | null
}

interface Props {
    settings: AutoConvertSettingRequest
    onChange: (next: AutoConvertSettingRequest) => void
    onSubmit: () => void
    isSubmitting: boolean
}

export default function AutoConvertForm({
                                            settings,
                                            onChange,
                                            onSubmit,
                                            isSubmitting,
                                        }: Props) {
    const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1)
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const minutes = [0, 15, 30, 45]
    const presetAmounts = [50000, 100000, 200000, 500000]

    const handleChange = (
        key: keyof AutoConvertSettingRequest,
        value: number | boolean | null
    ) => {
        onChange({ ...settings, [key]: value })
    }

    const formatNumber = (value: number | string) =>
        new Intl.NumberFormat("ko-KR").format(Number(value))

    return (
        <div className="space-y-4 pb-24">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src="/images/fast-transfer.png"
                        alt="자동 전환 마스코트"
                        className="w-14 h-14"
                    />
                    <div>
                        <h3 className="text-base font-semibold text-black">자동 전환</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                            매월 정기 예금 → 토큰 전환
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            {settings.enabled ? "ON" : "OFF"}
          </span>
                    <Switch
                        checked={settings.enabled}
                        onCheckedChange={async (checked) => {
                            if (!checked) {
                                const updated = {
                                    enabled: false,
                                    dayOfMonth: null,
                                    hour: null,
                                    minute: null,
                                    amount: null,
                                }
                                onChange(updated)

                                try {
                                    await updateAutoConvertSetting(updated)
                                    alert("자동 전환이 해제되었습니다.")
                                } catch (e) {
                                    alert("자동 전환 해제에 실패했습니다.")
                                }
                            } else {
                                const restored = {
                                    enabled: true,
                                    dayOfMonth: settings.dayOfMonth ?? 1,
                                    hour: settings.hour ?? 9,
                                    minute: settings.minute ?? 0,
                                    amount: settings.amount ?? 100000,
                                }
                                onChange(restored)
                            }
                        }}
                        className="data-[state=checked]:bg-[#F5A623]"
                    />
                </div>
            </div>

            {settings.enabled && (
                <>
                    {/* 날짜 설정 */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
                        <div className="flex items-baseline justify-between mb-4">
                            <h4 className="text-base font-semibold text-black">전환 날짜</h4>
                            <p className="text-sm text-gray-500">매월 몇 일에 전환할까요?</p>
                        </div>
                        <Select
                            value={settings.dayOfMonth?.toString() ?? ""}
                            onValueChange={(v) => handleChange("dayOfMonth", +v)}
                        >
                            <SelectTrigger className="w-full h-12 text-base border-gray-200 bg-gray-50 hover:bg-white">
                                <SelectValue placeholder="날짜 선택" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px] bg-gray-50">
                                {daysOfMonth.map((d) => (
                                    <SelectItem
                                        key={d}
                                        value={d.toString()}
                                        className="bg-white hover:bg-[#FFF8E1]"
                                    >
                                        매월 {d}일
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* 시간 설정 */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
                        <div className="flex items-baseline justify-between mb-4">
                            <h4 className="text-base font-semibold text-black">전환 시간</h4>
                            <p className="text-sm text-gray-500">몇 시에 전환할까요?</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                value={settings.hour?.toString() ?? ""}
                                onValueChange={(v) => handleChange("hour", +v)}
                            >
                                <SelectTrigger className="h-12 text-base border-gray-200 bg-gray-50 hover:bg-white">
                                    <SelectValue placeholder="시간" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-50">
                                    {hours.map((h) => (
                                        <SelectItem
                                            key={h}
                                            value={h.toString()}
                                            className="bg-white hover:bg-[#FFF8E1]"
                                        >
                                            {h}시
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Input
                                    type="number"
                                    min={0}
                                    max={59}
                                    inputMode="numeric"
                                    value={settings.minute?.toString() ?? ""}
                                    onChange={(e) => {
                                        const raw = e.target.value
                                        const cleaned = raw.replace(/^0+(?=\d)/, "")
                                        const val = Number(cleaned)
                                        if (!isNaN(val) && val >= 0 && val <= 59) {
                                            handleChange("minute", val)
                                        }
                                    }}
                                    className="h-12 text-base pr-12 border-gray-200 bg-gray-50 hover:bg-white focus:bg-white"
                                    placeholder="0~59"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  분
                </span>
                            </div>
                        </div>
                    </div>

                    {/* 금액 설정 */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
                        <div className="flex items-baseline justify-between mb-4">
                            <h4 className="text-base font-semibold text-black">전환 금액</h4>
                            <p className="text-sm text-gray-500">매월 얼마나 전환할까요?</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 mb-4">
                            {presetAmounts.map((amount) => (
                                <Button
                                    key={amount}
                                    variant="outline"
                                    onClick={() => handleChange("amount", amount)}
                                    className={`h-11 text-sm font-medium border transition-all ${
                                        settings.amount === amount
                                            ? "border-[#F5A623] bg-[#FFF8E1] text-[#F5A623] shadow-sm"
                                            : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white"
                                    }`}
                                >
                                    {formatNumber(amount)}원
                                </Button>
                            ))}
                        </div>
                        <div className="relative">
                            <Input
                                type="number"
                                min={0}
                                inputMode="numeric"
                                value={settings.amount?.toString() ?? ""}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/^0+(?=\d)/, "")
                                    const num = Number(raw)
                                    if (!isNaN(num)) handleChange("amount", num)
                                }}
                                className="h-12 text-base pr-12 border-gray-200 bg-gray-50 hover:bg-white focus:bg-white"
                                placeholder="직접 입력"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                원
              </span>
                        </div>
                    </div>

                    {/* 요약 및 저장 */}
                    <div className="bg-gradient-to-r from-[#FFF8E1] to-[#FFF3CD] rounded-xl p-5 border border-[#F5A623]/30 shadow-sm space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="w-4 h-4 text-[#F5A623]" />
                            <h4 className="text-base font-semibold text-[#E65100]">설정 요약</h4>
                        </div>
                        <p className="text-sm text-[#E65100] leading-relaxed">
                            매월{" "}
                            <span className="font-bold">{settings.dayOfMonth}일</span>{" "}
                            <span className="font-bold">
                {settings.hour}시 {settings.minute}분
              </span>
                            에{" "}
                            <span className="font-bold">
                {formatNumber(settings.amount ?? 0)}원
              </span>{" "}
                            자동 전환합니다.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="w-full h-12 text-base font-semibold bg-[#F5A623] hover:bg-[#E6941A] text-white rounded-xl disabled:opacity-50 shadow-lg transition-all"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  저장 중...
                </span>
                            ) : (
                                "설정 저장"
                            )}
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

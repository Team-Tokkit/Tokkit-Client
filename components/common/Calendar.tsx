"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import { isAfter } from "date-fns";

interface CalendarProps {
  selected?: { from?: Date; to?: Date };
  onSelect: (range: { from?: Date; to?: Date } | undefined) => void;
  onResetFilters?: () => void;
}

export default function Calendar({
  selected,
  onSelect,
  onResetFilters,
}: CalendarProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  // 비활성화할 날짜 조건 설정
  const getDisabledDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 시작일이 선택된 경우와 아닌 경우를 분리
    if (range?.from) {
      return [
        { after: today }, // 오늘 이후 날짜 비활성화
        { before: range.from }, // 시작일 이전 날짜 비활성화
      ];
    } else {
      return { after: today }; // 오늘 이후 날짜만 비활성화
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) {
          setRange(undefined);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-14 rounded-lg border-[#E0E0E0] bg-white"
        >
          <CalendarIcon className="h-5 w-5 text-[#666666]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 z-50 bg-white shadow-lg rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DatePicker
          mode="range"
          selected={range}
          onSelect={(r) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // 오늘 이후 날짜는 선택 불가
            if (r?.from && isAfter(r.from, today)) return;
            if (r?.to && isAfter(r.to, today)) return;

            setRange(r);

            // 범위가 완성되면 확정하고 캘린더 닫기
            if (r?.from && r?.to) {
              onSelect(r);
              setOpen(false);
            }
          }}
          numberOfMonths={1}
          disabled={getDisabledDates()}
          classNames={{
            day_today: "border border-[#FFB020]",
            day_selected: "bg-[#F0F0F0] text-black",
            day_outside: "text-gray-400",
            day_range_start: "bg-[#FFB020] text-white rounded-l-md font-bold",
            day_range_end: "bg-[#FFB020] text-white rounded-r-md font-bold",
            day_range_middle: "bg-[#FFE4A1] text-black",
            day_disabled: "text-gray-300 cursor-not-allowed",
          }}
        />

        <Button
          variant="ghost"
          className="w-full text-center text-xs text-[#999] hover:bg-[#F5F5F5] transition mt-2"
          onClick={() => {
            onSelect(undefined);
            onResetFilters?.();
            setOpen(false);
          }}
        >
          전체 날짜 보기
        </Button>
      </PopoverContent>
    </Popover>
  );
}

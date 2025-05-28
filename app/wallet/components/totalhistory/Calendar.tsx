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

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  onResetFilters?: () => void;
}

export default function Calendar({ selected, onSelect, onResetFilters }: CalendarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-cy="calendar-toggle-button"
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-lg border-[#E0E0E0] bg-white"
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
          mode="single"
          selected={selected}
          onSelect={(d) => {
            if (!d) return;
            if (selected && d.toDateString() === selected.toDateString())
              return;
            onSelect(d);
          }}
          defaultMonth={new Date()}
          initialFocus
          classNames={{
            day_today: "border border-[#FFB020]",
            day_selected: "bg-[#F0F0F0] text-black",
            day_outside: "text-gray-400",
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

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
      <Input
        placeholder="거래내역 검색"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-10 rounded-lg border-[#E0E0E0] bg-white"
      />
    </div>
  );
}

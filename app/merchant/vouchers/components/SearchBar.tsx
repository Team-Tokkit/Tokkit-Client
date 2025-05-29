import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function VoucherSearchBar({ value, onChange }: Props) {
  return (
    <div className="p-6 bg-white  shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="바우처 검색"
          className="pl-10 pr-4 py-3 rounded-lg"
        />
      </div>
    </div>
  )
}

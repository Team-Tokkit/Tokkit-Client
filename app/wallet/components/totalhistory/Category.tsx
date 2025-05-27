import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryOption {
  label: string;
  value: string;
}

interface CategoryProps {
  label: string;
  options: CategoryOption[];
  value?: string;
  onChange: (value: string) => void;
}

export default function Category({
  label,
  options,
  onChange,
  value,
}: CategoryProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger data-cy={`type-select`} className="h-9 rounded-lg border-[#E0E0E0] bg-white">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="bg-white z-50">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} data-cy={`type-option-${option.label}`}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

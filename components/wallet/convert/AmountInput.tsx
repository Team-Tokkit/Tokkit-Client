import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AmountInputProps {
  amount: string;
  onChange: (value: string) => void;
  onMax: () => void;
}

export default function AmountInput({
  amount,
  onChange,
  onMax,
}: AmountInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange(raw);
  };

  return (
    <div className="mb-8">
      <Label
        htmlFor="amount"
        className="text-[#444444] text-sm font-medium mb-2 block"
      >
        전환할 금액
      </Label>

      <div className="relative">
        <Input
          id="amount"
          value={amount ? Number.parseInt(amount).toLocaleString() : ""}
          onChange={handleInputChange}
          placeholder="0"
          className="h-14 text-right text-xl font-bold pr-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] text-lg">
          원
        </span>
      </div>

      <div className="flex justify-end mt-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs bg-white"
          onClick={onMax}
        >
          최대 금액
        </Button>
      </div>
    </div>
  );
}

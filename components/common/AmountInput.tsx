import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AmountInputProps {
  amount: string;
  onChange: (value: string) => void;
  onMax: () => void;
  label?: string;
  bottomRightText?: React.ReactNode;
  className?: string;
}

export default function AmountInput({
  amount,
  onChange,
  onMax,
  label = "전환할 금액",
  bottomRightText,
  className = "max-w-sm mx-auto w-full",
}: AmountInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange(raw);
  };

  return (
      <div className={`mb-8 ${className}`}>
          <div className="flex items-center justify-between mb-2">
              <Label
                  htmlFor="amount"
                  className="text-[#444444] text-sm font-medium"
              >
                  {label}
              </Label>

              {bottomRightText && (
                  <div className="text-red-500 text-xs font-medium flex items-center gap-1">
                      {bottomRightText}
                  </div>
              )}
          </div>
          <div className="relative">
              <Input
                  data-testid="amount-input"
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

          <div className="flex items-center justify-between mt-2 w-full">
              <div className="text-sm text-gray-500"></div>

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

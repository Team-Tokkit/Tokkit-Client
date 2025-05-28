import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

export default function ConvertButton() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Button
        data-testid="convert-deposit-to-token"
        className="group h-16 bg-white hover:bg-[#FFF6E0]
             text-[#1A1A1A] border border-[#E0E0E0]
             rounded-xl shadow-sm flex items-center justify-center gap-[6px]"
        onClick={() => router.push("/wallet/convert/deposit-to-token")}
      >
        <span className="text-base font-medium flex items-center gap-[6px]">
          예금
          <MoveRight
            className="w-6 h-6 text-[#FFB020] scale-110 transition-transform duration-150 group-hover:translate-x-0.5"
            strokeWidth={2.5}
          />
          토큰
        </span>
      </Button>

      <Button
        data-testid="convert-token-to-deposit"
        className="group h-16 bg-white hover:bg-[#FFF6E0]
             text-[#1A1A1A] border border-[#E0E0E0]
             rounded-xl shadow-sm flex items-center justify-center gap-[6px]"
        onClick={() => router.push("/wallet/convert/token-to-deposit")}
      >
        <span className="text-base font-medium flex items-center gap-[6px]">
          토큰
          <MoveRight
            className="w-6 h-6 text-[#FFB020] scale-110 transition-transform duration-150 group-hover:translate-x-0.5"
            strokeWidth={2.5}
          />
          예금
        </span>
      </Button>
    </div>
  );
}

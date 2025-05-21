import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

export default function ConvertButton() {
  const router = useRouter();

  return (
    <div className="mb-6 w-full">
      <Button
        className="group h-16 bg-white hover:bg-[#FFF6E0]
             text-[#1A1A1A] border border-[#E0E0E0]
             rounded-xl shadow-sm flex items-center justify-center gap-[6px] w-full"
        onClick={() => router.push("/merchant/wallet/convert")}
      >
        <span className="text-base font-medium flex items-center gap-[6px]">
          예금으로 전환하기
        </span>
      </Button>
    </div>
  );
}

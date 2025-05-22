import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Info, ChevronRight } from "lucide-react";

export default function WalletGuide() {
  const router = useRouter();

  return (
    <div className="mt-6">
      <Button
        variant="outline"
        className="w-full flex items-center justify-between text-[#666666] border-dashed"
        onClick={() => router.push("/merchant/wallet/guide")}
      >
        <div className="flex items-center">
          <Info className="h-4 w-4 mr-2" />
          <span>전자지갑 이용 안내</span>
        </div>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

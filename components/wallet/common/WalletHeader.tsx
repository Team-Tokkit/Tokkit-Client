import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface WalletHeaderProps {
  title: string;
  backHref?: string;
}

export default function WalletHeader({
  title,
  backHref = "/wallet",
}: WalletHeaderProps) {
  const router = useRouter();
  return (
    <header className="p-4 flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2"
        onClick={() => router.push(backHref)}
      >
        <ArrowLeft className="h-5 w-5 text-[#1A1A1A]" />
      </Button>
      <h1 className="text-xl font-bold text-[#1A1A1A]">
        {title}
      </h1>
    </header>
  );
}

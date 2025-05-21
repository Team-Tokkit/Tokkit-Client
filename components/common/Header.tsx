import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  backHref?: string;
}

export default function Header({ title, backHref }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      window.history.back();
    }
  };

  return (
    <header className="pr-4 py-4 ml-4 flex items-center">
      <Button variant="ghost" size="icon" className="mr-2" onClick={handleBack}>
        <ArrowLeft className="h-5 w-5 text-[#1A1A1A]" />
      </Button>
      <h1 className="text-xl font-bold text-[#1A1A1A]">{title}</h1>
    </header>
  );
}

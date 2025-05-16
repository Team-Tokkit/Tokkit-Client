import { AlertCircle } from "lucide-react";

interface InfoBoxProps {
  children: React.ReactNode;
}

export default function InfoBox({ children }: InfoBoxProps) {
  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-[#FFB020] mr-2 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-[#666666]">{children}</div>
      </div>
    </div>
  );
}

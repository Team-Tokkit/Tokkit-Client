import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    isMerchant: boolean;
}

export default function CompleteFooterButton({ isMerchant }: Props) {
    const router = useRouter();

    return (
        <div className="mt-auto p-6 border-t border-[#F0F0F0]">
            <Button
                className="w-full bg-[#FFB020] hover:bg-[#FF9500] text-white h-12 rounded-xl"
                onClick={() => {
                    sessionStorage.clear();
                    router.push(isMerchant ? "/merchant/login" : "/login");
                }}
            >
                <span>서비스 사용하러 가기</span>
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}

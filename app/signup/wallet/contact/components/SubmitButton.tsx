import { Button } from "@/components/ui/button";

interface Props {
    isLoading: boolean;
    isDisabled: boolean;
    onClick: () => void;
    label?: string;
}

export default function SubmitButton({ isLoading, isDisabled, onClick, label = "다음" }: Props) {
    return (
        <Button
            className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20 mt-4"
            onClick={onClick}
            disabled={isDisabled || isLoading}
        >
            {isLoading ? "처리 중..." : label}
        </Button>
    );
}
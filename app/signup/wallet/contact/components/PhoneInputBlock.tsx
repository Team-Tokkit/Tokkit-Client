import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface Props {
    phoneNumber: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    phoneRef: React.RefObject<HTMLInputElement>;
}

export default function PhoneInputBlock({ phoneNumber, onChange, phoneRef }: Props) {
    return (
        <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#444444] text-sm font-medium">
                전화번호
            </Label>
            <Input
                id="phoneNumber"
                placeholder="010-0000-0000"
                value={phoneNumber}
                onChange={onChange}
                required
                className="h-12 rounded-xl border-[#E0E0E0] bg-white focus-visible:ring-[#FFD485] focus-visible:ring-offset-0"
                ref={phoneRef}
            />
        </div>
    );
}

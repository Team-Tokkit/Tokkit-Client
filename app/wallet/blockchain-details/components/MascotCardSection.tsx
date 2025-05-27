import {Shield} from "lucide-react";

import Image from 'next/image';

export default function MascotCardSection() {
    return (
        <div>
            {/* 마스코트 보안 인증 섹션 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-4 text-center">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <Image src="/images/bunny-mascot.png" alt="토킷 마스코트" width={80} height={80} className="mx-auto" />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <h3 className="text-lg font-semibold text-[#111827] mb-1">거래 검증 완료</h3>
                    <p className="text-sm text-[#6B7280]">토킷이 블록체인에서 안전하게 검증했어요</p>
                </div>
            </div>
        </div>
    )
}
export default function CbdcIntroCard() {
    return (
        <div className="bg-[#F5F5F5]  p-4 rounded-xl mb-6 h-[100px] flex items-center">
            <div className="flex items-center">
                <div className="relative w-16 h-16">
                    <img
                        src="/images/bunny-mascot.png"
                        alt="Tokkit 마스코트"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="ml-3">
                    <h4 className="font-bold text-sm text-[#1A1A1A]  mb-1">Tokkit 토큰</h4>
                    <p className="text-xs text-[#666666] ">
                        안전하고 빠른 <br /> 디지털 화폐의 시작
                    </p>
                </div>
            </div>
        </div>
    )
}

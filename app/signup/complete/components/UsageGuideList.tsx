interface Props {
    isMerchant: boolean;
    businessName: string;
}

export default function UsageGuideList({ isMerchant }: Props) {
    return (
        <div className="px-6 mb-8">
            <div className="bg-[#F9FAFB] rounded-2xl p-6 border border-[#F0F0F0]">
                <h3 className="font-bold text-[#1A1A1A] mb-4">이용 안내</h3>
                <ul className="space-y-3">
                    {isMerchant ? (
                        <>
                            <li className="flex">
                                <span className="w-5 h-5 rounded-full bg-[#FFB020]/20 flex items-center justify-center text-[#FFB020] mr-3 flex-shrink-0">1</span>
                                <p className="text-sm text-[#666666]">가맹점 대시보드에서 결제 내역을 확인할 수 있습니다.</p>
                            </li>
                            <li className="flex">
                                <span className="w-5 h-5 rounded-full bg-[#FFB020]/20 flex items-center justify-center text-[#FFB020] mr-3 flex-shrink-0">2</span>
                                <p className="text-sm text-[#666666]">정산 내역은 정산 페이지에서 확인 가능합니다.</p>
                            </li>
                            <li className="flex">
                                <span className="w-5 h-5 rounded-full bg-[#FFB020]/20 flex items-center justify-center text-[#FFB020] mr-3 flex-shrink-0">3</span>
                                <p className="text-sm text-[#666666]">QR코드를 통해 간편하게 결제를 받을 수 있습니다.</p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="flex">
                                <span className="w-5 h-5 rounded-full bg-[#FFB020]/20 flex items-center justify-center text-[#FFB020] mr-3 flex-shrink-0">1</span>
                                <p className="text-sm text-[#666666]">전자지갑을 통해 바우처를 관리하고 결제할 수 있습니다.</p>
                            </li>
                            <li className="flex">
                                <span className="w-5 h-5 rounded-full bg-[#FFB020]/20 flex items-center justify-center text-[#FFB020] mr-3 flex-shrink-0">2</span>
                                <p className="text-sm text-[#666666]">지갑 페이지에서 잔액 확인 및 충전이 가능합니다.</p>
                            </li>
                            <li className="flex">
                                <span className="w-5 h-5 rounded-full bg-[#FFB020]/20 flex items-center justify-center text-[#FFB020] mr-3 flex-shrink-0">3</span>
                                <p className="text-sm text-[#666666]">바우처 사용 내역은 거래 내역에서 확인할 수 있습니다.</p>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
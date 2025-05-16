export default function FinanceAccessCard({ icon }: { icon: string }) {
    return (
        <div className="bg-[#F5F5F5] dark:bg-[#333333] p-4 rounded-xl mb-6 h-[120px] flex items-center justify-center -mt-7">
            <div className="text-center">
                <div className="w-full h-12 flex items-center justify-center">
                    <img src="/images/fianace-access.png" alt="fast-transfer-image" width={80} height={80} className="mt-4 mb-3"/>
                </div>
                <p className="text-sm text-[#666666] dark:text-[#BBBBBB] mt-6 -mb-4">모두를 위한 금융 서비스</p>
            </div>
        </div>
    )
}

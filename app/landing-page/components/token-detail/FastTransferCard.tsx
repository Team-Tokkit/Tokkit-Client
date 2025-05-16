export default function FastTransferCard({ icon }: { icon: string }) {
    return (
        <div className="bg-[#F5F5F5] p-4 rounded-xl mb-6 h-[120px] flex items-center justify-center -mt-7">
            <div className="text-center">
                <div className="w-full h-12 flex items-center justify-center">
                    <img src="/images/fast-transfer.png" alt="fast-transfer-image" width={80} height={80} className="mt-4 mb-3"/>
                </div>
                <p className="text-sm text-[#666666] dark:text-[#BBBBBB] mt-6 -mb-4">24시간 365일 실시간 송금</p>
            </div>
        </div>
    )
}

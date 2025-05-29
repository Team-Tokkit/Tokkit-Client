export default function QRCodeCard() {
    return (
        <div className="bg-[#F5F5F5]  p-4 rounded-xl mb-6 h-[120px] flex flex-col justify-center -mt-7">
            <div className="relative">
                <div className="w-full h-12 flex items-center justify-center">
                    <img src="/images/qrcode.png" alt="QR 코드" width={80} height={80} className="mt-4"/>
                </div>
            </div>
            <div className="text-center mt-7 text-xs text-[#666666] ">QR 결제</div>
        </div>
    )
}

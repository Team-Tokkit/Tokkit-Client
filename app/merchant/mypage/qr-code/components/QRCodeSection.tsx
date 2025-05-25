import { QRCodeSVG } from "qrcode.react"
import { QrCode } from "lucide-react"

interface Props {
    txId: string // 이게 QR 값이자, 결제 코드임
}

export default function QRCodeSection({ txId }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-orange-100 flex-shrink-0 flex-1">
            <div className="text-center flex flex-col justify-center h-full">
                <div className="flex items-center justify-center mb-3">
                    <QrCode className="h-5 w-5 text-[#FFB020] mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">결제하기</h3>
                </div>

                {/* QR 코드 */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl shadow-inner mb-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm inline-block">
                        <QRCodeSVG value={txId} size={140} />
                    </div>
                </div>

                {/* 구분선 */}
                <div className="flex items-center my-3">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="px-2 text-xs text-gray-500 bg-white">또는</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* 결제 코드 */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-2">QR코드 인식이 어려울 때</p>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                            <span className="text-xl font-bold text-[#FFB020] tracking-widest font-mono">{txId}</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">위 코드를 입력하세요</p>
                </div>
            </div>
        </div>
    )
}

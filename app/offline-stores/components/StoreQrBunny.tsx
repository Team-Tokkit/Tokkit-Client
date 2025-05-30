import Image from "next/image"

export default function StoreQrBunny({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Image
                src="/qrcode.png"
                alt="토끼 QR"
                width={120}
                height={120}
                className="drop-shadow-lg rounded-full bg-white animate-bounce"
                priority
            />
        </div>
    )
} 
import Image from "next/image";
import { Store } from "lucide-react";

interface Props {
  name: string;
  address: string;
  logoUrl?: string;
}

export default function MerchantInfoBox({ name, address, logoUrl }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-[#1A1A1A]">가맹점 정보</h3>
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center mr-4">
          {logoUrl ? (
            <Image src={logoUrl} alt={name} width={64} height={64} className="object-cover" />
          ) : (
            <Store className="w-8 h-8 text-gray-500" />
          )}
        </div>
        <div>
          <h4 className="font-bold text-[#1A1A1A]">{name}</h4>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
      </div>
    </div>
  );
}

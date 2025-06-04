import WalletClient from "@/app/merchant/wallet/components/WalletClient";
import {Suspense} from "react";

export default function MerchantWalletPage() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <WalletClient />
      </Suspense>
  )
}
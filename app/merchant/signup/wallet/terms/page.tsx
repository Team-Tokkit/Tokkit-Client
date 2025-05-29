import { Suspense } from "react"
import { walletTerms } from "@/app/merchant/signup/wallet/terms/data/walletTerms"
import TermsAgreementPage from "@/app/merchant/signup/wallet/terms/components/TermsAgreementPage"

function TermsAgreementFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] ">
      <header className="p-4 flex items-center border-b border-gray-100 ">
        <div className="w-5 h-5 mr-2 bg-gray-200  rounded animate-pulse" />
        <div className="h-6 w-32 bg-gray-200  rounded animate-pulse" />
      </header>
      <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <div className="h-6 w-48 bg-gray-200  rounded animate-pulse mb-2" />
            <div className="h-4 w-64 bg-gray-200  rounded animate-pulse" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-200  rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="mt-6 h-12 bg-gray-200  rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function WalletTermsPage() {
  return (
    <Suspense fallback={<TermsAgreementFallback />}>
      <TermsAgreementPage
        terms={walletTerms}
        title="전자지갑 약관 동의"
        description="안전한 전자지갑 서비스 이용을 위해 아래 약관에 동의해주세요."
      />
    </Suspense>
  )
}

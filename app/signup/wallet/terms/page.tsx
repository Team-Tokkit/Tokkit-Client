import { Suspense } from "react"
import { walletTerms } from "@/app/signup/wallet/terms/data/walletTerms"
import TermsAgreementPage from "@/app/signup/wallet/terms/components/TermsAgreementPage"

function WalletTermsContent() {
  return (
    <TermsAgreementPage
      terms={walletTerms}
      redirectTo="/signup/wallet/verify"
      title="전자지갑 약관 동의"
      description="안전한 전자지갑 서비스 이용을 위해 아래 약관에 동의해주세요."
    />
  )
}

export default function WalletTermsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WalletTermsContent />
    </Suspense>
  )
}

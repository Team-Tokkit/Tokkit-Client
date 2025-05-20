import { walletTerms } from "@/app/merchant/signup/wallet/terms/data/walletTerms"
import TermsAgreementPage from "@/app/merchant/signup/wallet/terms/components/TermsAgreementPage"

export default function WalletTermsPage() {
    return (
        <TermsAgreementPage
            terms={walletTerms}
            title="전자지갑 약관 동의"
            description="안전한 전자지갑 서비스 이용을 위해 아래 약관에 동의해주세요."
        />
    )
}

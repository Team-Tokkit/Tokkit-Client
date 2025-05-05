import HeaderImage from "@/components/dashboard/voucher/HeaderImage"
import { VoucherInfo } from "@/components/dashboard/voucher/VoucherInfo"
import { ExpandableSection } from "@/components/dashboard/voucher/ExpandableSection"
import { StoreList } from "@/components/dashboard/voucher/StoreList"
import { FileText, Users, Building, CreditCard } from "lucide-react"
import { mockVouchers } from "@/mock/voucher"

interface VoucherDetailProps {
  params: {
    id: string
  }
}

export default function VoucherDetailPage({ params }: VoucherDetailProps) {
  const voucherId = Number(params.id)
  const voucher = mockVouchers.find((v) => v.id === voucherId)

  if (!voucher) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-5">
      <HeaderImage
        image={voucher.image || "/placeholder.svg"}
        title={voucher.name}
        department={voucher.merchant}
      />

      {/* 바우처 정보 */}
      <div className="p-4">
        <VoucherInfo
          amount={`${voucher.price.toLocaleString()}원`}
          validDate={voucher.validDate}
          refundPolicy={voucher.refundPolicy}
        />

        {/* 상세 설명 */}
        <ExpandableSection
          title="상세 설명"
          icon={<FileText className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <p className="text-sm text-[#666666] ">{voucher.detailDescription}</p>
        </ExpandableSection>

        {/* 사용처 */}
        <ExpandableSection
          title="사용처"
          icon={<Building className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <StoreList voucherId={voucher.id} />
        </ExpandableSection>

        {/* 환불 정책 */}
        <ExpandableSection
          title="환불 정책"
          icon={<CreditCard className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <p className="text-sm text-[#666666]">{voucher.refundPolicy}</p>
        </ExpandableSection>

        {/* 문의처 */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-2">문의처</h3>
          <p className="text-sm text-[#666666]">{voucher.contact}</p>
        </div>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">바우처를 찾을 수 없습니다</h1>
        <button
          className="bg-[#FFB020] hover:bg-[#FF9500] text-white px-4 py-2 rounded-lg"
          onClick={() => history.back()}
        >
          돌아가기
        </button>
      </div>
    </div>
  )
}
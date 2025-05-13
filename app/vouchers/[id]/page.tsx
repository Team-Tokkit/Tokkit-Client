import { notFound } from "next/navigation"
import HeaderImage from "@/app/vouchers/components/HeaderImage"
import { VoucherInfo } from "@/app/vouchers/components/VoucherInfo"
import { ExpandableSection } from "@/app/vouchers/components/ExpandableSection"
import { StoreList } from "@/app/vouchers/components/StoreList"
import { FileText, Building, CreditCard } from "lucide-react"
import { getVoucherDetails } from "@/lib/api/voucher" // 실제 백엔드 요청 함수
import type { VoucherDetail } from "@/app/vouchers/types/voucher"

interface Props {
  params: { id: string }
}

export default async function VoucherDetailPage({ params }: Props) {
  const id = Number(params.id)

  let voucher: VoucherDetail | null = null

  try {
    voucher = await getVoucherDetails(id)
  } catch (err) {
    console.error("바우처 조회 실패:", err)
  }

  if (!voucher) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-5">
      <HeaderImage
        image={voucher.imageUrl || "/placeholder.svg"}
        title={voucher.name}
        contact={voucher.contact || "문의처 없음"}
      />

      <div className="p-4">
        <VoucherInfo
          amount={`${voucher.price.toLocaleString()}원`}
          validDate={voucher.validDate}
        />

        <ExpandableSection title="상세 설명" icon={<FileText className="h-5 w-5 mr-3 text-[#FFB020]" />}>
          <p className="text-sm text-[#666666]">{voucher.detailDescription}</p>
        </ExpandableSection>

        <ExpandableSection title="사용처" icon={<Building className="h-5 w-5 mr-3 text-[#FFB020]" />}>
          <StoreList voucherId={voucher.id} />
        </ExpandableSection>

        <ExpandableSection title="환불 정책" icon={<CreditCard className="h-5 w-5 mr-3 text-[#FFB020]" />}>
          <p className="text-sm text-[#666666]">{voucher.refundPolicy}</p>
        </ExpandableSection>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-2">문의처</h3>
          <p className="text-sm text-[#666666]">{voucher.contact}</p>
        </div>
      </div>
    </div>
  )
}

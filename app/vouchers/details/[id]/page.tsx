import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import HeaderImage from "@/app/vouchers/components/HeaderImage"
import { VoucherInfo } from "@/app/vouchers/components/VoucherInfo"
import { ExpandableSection } from "@/app/vouchers/components/ExpandableSection"
import { StoreList } from "@/app/vouchers/components/StoreList"
import { FileText, Building, CreditCard } from "lucide-react"
import type { VoucherDetail } from "@/app/vouchers/types/voucher"
import { getApiUrl } from "@/lib/getApiUrl"

interface Props {
  params: { id: string }
}

export default async function VoucherDetailPage({ params }: Props) {
  const id = Number(params.id)

  // next/headers의 cookies()로 브라우저 쿠키에서 토큰 꺼내기
  const cookieStore = cookies()
  const token = cookieStore.get("accessToken")?.value

  if (!token) {
    // 토큰이 없으면 404 처리
    notFound()
  }

  // API 호출 (SSR) — 브라우저 쿠키의 토큰을 Authorization 헤더에 포함
  const res = await fetch(`${getApiUrl()}/api/users/vouchers/details/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    console.error("바우처 조회 실패:", res.status, res.statusText)
    notFound()
  }

  const { result: voucher }: { result: VoucherDetail } = await res.json()

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
        <ExpandableSection
          title="상세 설명"
          icon={<FileText className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <p className="text-sm text-[#666666]">{voucher.detailDescription}</p>
        </ExpandableSection>
        <ExpandableSection
          title="사용처"
          icon={<Building className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <StoreList voucherId={voucher.id} />
        </ExpandableSection>
        <ExpandableSection
          title="환불 정책"
          icon={<CreditCard className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
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

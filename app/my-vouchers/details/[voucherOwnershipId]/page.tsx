import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getMyDetailVouchers } from "@/lib/api/voucher"
import { MyVoucherDetail } from "@/app/my-vouchers/types/my-voucher"
import MyVoucherInfo from "@/app/my-vouchers/components/MyVoucherInfo"
import { ExpandableSection } from "@/app/vouchers/components/ExpandableSection"
import { FileText, Building, CreditCard } from "lucide-react"
import { MyStoreList} from "@/app/my-vouchers/components/MyStoreList"
import MyVoucherHeader from "@/app/my-vouchers/components/MyVoucherHeader"

interface Props {
  params: { voucherOwnershipId: string }
}

export default async function MyVoucherDetailPage({ params }: Props) {
  const id = Number(params.voucherOwnershipId)
  let myVoucher: MyVoucherDetail | null = null

  try {
    myVoucher = await getMyDetailVouchers(id)
  } catch (err) {
    console.error("바우처 조회 실패:", err)
  }

  if (!myVoucher) {
    return <p>바우처를 찾을 수 없습니다.</p> // 바우처 정보가 없을 경우
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-5">
      <MyVoucherHeader voucher={myVoucher} />

      <div className="p-4">
        <MyVoucherInfo voucher={myVoucher} />

        <ExpandableSection
          title="상세 설명"
          icon={<FileText className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <p className="text-sm text-[#666666]">{myVoucher.voucherDetailDescription || "설명이 없습니다."}</p>
        </ExpandableSection>

        <ExpandableSection
          title="사용처"
          icon={<Building className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <MyStoreList voucherOwnershipId={myVoucher.id} />
        </ExpandableSection>

        <ExpandableSection
          title="환불 정책"
          icon={<CreditCard className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <p className="text-sm text-[#666666]">{myVoucher.voucherRefundPolicy || "환불 정책 정보가 없습니다."}</p>
        </ExpandableSection>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-2">문의처</h3>
          <p className="text-sm text-[#666666]">{myVoucher.voucherContact}</p>
        </div>
      </div>
    </div>
  )
}

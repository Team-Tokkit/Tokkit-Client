"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getMyDetailVouchers } from "@/lib/api/voucher";
import type { MyVoucherDetail } from "@/app/my-vouchers/types/my-voucher";
import MyVoucherHeader from "@/app/my-vouchers/components/MyVoucherHeader";
import MyVoucherInfo from "@/app/my-vouchers/components/MyVoucherInfo";
import { ExpandableSection } from "@/app/vouchers/components/ExpandableSection";
import { FileText, Building, CreditCard } from "lucide-react";
import {MyStoreList} from "@/app/my-vouchers/components/MyStoreList";

export default function MyVoucherDetailPage() {
  const { voucherOwnershipId } = useParams();
  const id = Number(voucherOwnershipId);

  const [voucher, setVoucher] = useState<MyVoucherDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getMyDetailVouchers(id);
        setVoucher(data);
      } catch (e) {
        console.error("바우처 조회 실패:", e);
        setError("바우처를 불러오는 중에 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-4 text-center">로딩 중...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!voucher) return <p className="p-4 text-center">바우처를 찾을 수 없습니다.</p>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-5">
      <MyVoucherHeader voucher={voucher} />

      <div className="p-4">
        <MyVoucherInfo voucher={voucher} />

        <ExpandableSection
          title="상세 설명"
          icon={<FileText className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <p className="text-sm text-[#666666]">
            {voucher.voucherDetailDescription || "설명이 없습니다."}
          </p>
        </ExpandableSection>

        <ExpandableSection
          title="사용처"
          icon={<Building className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <MyStoreList voucherOwnershipId={voucher.id} />
        </ExpandableSection>

        <ExpandableSection
          title="환불 정책"
          icon={<CreditCard className="h-5 w-5 mr-3 text-[#FFB020]" />}
        >
          <p className="text-sm text-[#666666]">
            {voucher.voucherRefundPolicy || "환불 정책 정보가 없습니다."}
          </p>
        </ExpandableSection>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-2">문의처</h3>
          <p className="text-sm text-[#666666]">{voucher.voucherContact}</p>
        </div>
      </div>
    </div>
  );
}

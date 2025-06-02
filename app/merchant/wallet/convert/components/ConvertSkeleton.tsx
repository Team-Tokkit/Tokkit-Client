import Header from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import InfoBox from "@/app/wallet/components/common/InfoBox";

export default function ConvertSkeleton() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <div className="h-[calc(100vh-120px)] px-5 pb-6 relative">
        <div className="pb-32 max-w-sm mx-auto w-full">
          <div className="mt-6 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6 max-w-sm mx-auto">
              {/* 잔액 skeleton */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-base text-[#666666]">잔액</span>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-[#666666]">잔액</span>
                <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
              </div>
            </div>
          </div>
          {/* 금액 입력 skeleton */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#444444] text-sm font-medium">전환할 금액</span>
            </div>
            <div className="relative">
              <div className="h-14 bg-white rounded-xl border border-[#E0E0E0] animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between mt-2 w-full">
              <div></div>
              <Button variant="outline" size="sm" className="text-xs bg-white" disabled>
                최대 금액
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-5 right-5">
          <div className="mb-6">
            <InfoBox>
              <p>
                예금을 토큰으로 전환하면 즉시 반영됩니다. 토큰은 결제, 송금 등에 사용할 수 있으며, 언제든지 다시 예금으로 전환할 수 있습니다.
              </p>
            </InfoBox>
          </div>
          <Button
            className="w-full h-12 bg-[#FFB020] hover:bg-[#FF9500] text-white font-medium rounded-xl shadow-md shadow-[#FFB020]/20"
            disabled
          >
            계속하기
          </Button>
        </div>
      </div>
    </div>
  );
}
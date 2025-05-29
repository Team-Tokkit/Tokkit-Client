"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  fetchSidoList,
  fetchSigunguList,
} from "@/app/merchant/signup/business/api/region";

interface InfoStepProps {
  onAddressSearch: () => void;
  roadAddress: string;
  setRoadAddress: (value: string) => void;
}

const STORE_CATEGORIES = [
  { value: "음식점", label: "음식점" },
  { value: "의료", label: "의료" },
  { value: "서비스", label: "서비스" },
  { value: "관광", label: "관광" },
  { value: "숙박", label: "숙박" },
  { value: "교육", label: "교육" },
];

export default function InfoStep({
  onAddressSearch,
  roadAddress,
  setRoadAddress,
}: InfoStepProps) {
  const router = useRouter();
  const [businessNumber, setBusinessNumber] = useState("");
  const [storeName, setStoreName] = useState("");
  const [name, setName] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [selectedSido, setSelectedSido] = useState("");
  const [selectedSigungu, setSelectedSigungu] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidoList, setSidoList] = useState<string[]>([]);
  const [sigunguList, setSigunguList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshAddressFromSession = () => {
    const savedAddressJson = sessionStorage.getItem("businessAddressData");
    if (savedAddressJson) {
      try {
        const parsed = JSON.parse(savedAddressJson);
        if (parsed.businessAddress) setRoadAddress(parsed.businessAddress);
        if (parsed.sido) setSelectedSido(parsed.sido);
        if (parsed.sigungu) setSelectedSigungu(parsed.sigungu);
      } catch (e) {
        console.error("주소 검색 결과 파싱 실패", e);
      }
    }
  };

  // OCR 결과 불러오기 + 주소 갱신 반영
  useEffect(() => {
    const savedBusinessNumber = sessionStorage.getItem("businessNumber") || "";
    const savedStoreName = sessionStorage.getItem("storeName") || "";
    const savedName = sessionStorage.getItem("name") || "";
    const savedRoadAddress = sessionStorage.getItem("roadAddress") || "";

    setBusinessNumber(savedBusinessNumber);
    setStoreName(savedStoreName);
    setName(savedName);
    setRoadAddress(savedRoadAddress);

    refreshAddressFromSession(); // 주소 검색 결과 반영도 함께 수행
  }, []);

  useEffect(() => {
    const loadSido = async () => {
      try {
        const list = await fetchSidoList();
        setSidoList(list);
      } catch (e) {
        console.error("시/도 불러오기 실패:", e);
      }
    };

    loadSido();
  }, []);

  useEffect(() => {
    if (selectedSido) {
      const loadSigungu = async () => {
        try {
          const list = await fetchSigunguList(selectedSido);
          setSigunguList(list);
        } catch (e) {
          console.error("시/군/구 불러오기 실패:", e);
        }
      };

      loadSigungu();
    } else {
      setSigunguList([]);
    }
  }, [selectedSido]);

  useEffect(() => {
    const handleFocus = () => {
      refreshAddressFromSession();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !businessNumber ||
      !storeName ||
      !name ||
      !roadAddress ||
      !selectedSido ||
      !selectedSigungu ||
      !selectedCategory
    ) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    const payload = {
      businessNumber,
      storeName,
      name,
      roadAddress,
      detailAddress,
      sido: selectedSido,
      sigungu: selectedSigungu,
      category: selectedCategory,
    };

    sessionStorage.setItem("businessInfo", JSON.stringify(payload));

    sessionStorage.removeItem("businessNumber");
    sessionStorage.removeItem("storeName");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("roadAddress");
    sessionStorage.removeItem("businessAddressData");

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);

    router.push("/merchant/signup/wallet");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <Label>사업자 등록번호</Label>
        <Input
          data-cy="business-number-input"
          value={businessNumber}
          onChange={(e) => setBusinessNumber(e.target.value.replace(/\D/g, ""))}
          placeholder="0000000000"
          maxLength={10}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>상호명</Label>
        <Input
          data-cy="store-name-input"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="상호명을 입력하세요"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>대표자명</Label>
        <Input
          data-cy="representative-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="대표자명을 입력하세요"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>사업장 주소</Label>
        <div className="relative">
          <Input
            data-cy="road-address-input"
            value={roadAddress}
            onClick={onAddressSearch}
            readOnly
            placeholder="주소 검색 버튼을 클릭하세요"
            className="pr-10"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={onAddressSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Input
          data-cy="detail-address-input"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          placeholder="상세 주소 입력 (선택)"
          className="text-sm mt-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>시/도</Label>
          <Select value={selectedSido} onValueChange={setSelectedSido}>
            <SelectTrigger data-cy="sido-select">
              <SelectValue placeholder="시/도 선택" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {sidoList.map((sido) => (
                <SelectItem key={sido} value={sido}>
                  {sido}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>시/군/구</Label>
          <Select
            value={selectedSigungu}
            onValueChange={setSelectedSigungu}
            disabled={!sigunguList.length}
          >
            <SelectTrigger data-cy="sigungu-select">
              <SelectValue placeholder="시/군/구 선택" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {sigunguList.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>상점 카테고리</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger data-cy="category-select">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {STORE_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full mt-4 bg-[#FFB020] hover:bg-[#FF9500] text-white"
      >
        {loading ? "처리 중..." : "다음"}
      </Button>
    </form>
  );
}

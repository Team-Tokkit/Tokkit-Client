import React, { useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface InfoStepProps {
  onAddressSearch: () => void;
  roadAddress: string;
  setRoadAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function InfoStep({ onAddressSearch, roadAddress, setRoadAddress }: InfoStepProps) {
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Input
        data-cy="road-address-input"
        value={roadAddress}
        readOnly
        onClick={onAddressSearch}
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
  );
}

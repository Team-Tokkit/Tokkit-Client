"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building, RefreshCw, Search, X } from "lucide-react";

interface AddressSearchModalProps {
  onClose: () => void;
  initialKeyword?: string;
  onSelect: (data: {
    businessAddress: string;
    latitude: string;
    longitude: string;
    zipcode: string;
    sido: string;
    sigungu: string;
  }) => void;
}

export default function AddressSearchModal({
                                             onClose,
                                             onSelect,
                                           }: AddressSearchModalProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [searchingAddress, setSearchingAddress] = useState(false);
  const [addressKeyword, setAddressKeyword] = useState("");
  const [addressResults, setAddressResults] = useState<any[]>([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      (window as any).kakao.maps.load(() => setScriptLoaded(true));
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const searchAddress = () => {
    if (!addressKeyword.trim() || !scriptLoaded) return;

    setSearchingAddress(true);
    setAddressResults([]);

    const geocoder = new (window as any).kakao.maps.services.Geocoder();
    const places = new (window as any).kakao.maps.services.Places();

    places.keywordSearch(addressKeyword, (result: any, status: any) => {
      if (status === (window as any).kakao.maps.services.Status.OK) {
        const filtered = result.filter((r: any) => r.address_name);
        setAddressResults(filtered);
      }

      geocoder.addressSearch(
          addressKeyword,
          (geoResult: any, geoStatus: any) => {
            setSearchingAddress(false);
            if (geoStatus === (window as any).kakao.maps.services.Status.OK) {
              setAddressResults((prev) => {
                const combined = [...prev];
                geoResult.forEach((item: any) => {
                  if (!prev.some((p) => p.address_name === item.address_name)) {
                    combined.push({
                      ...item,
                      place_name: item.building_name || item.address_name,
                      address_name: item.address_name,
                      road_address_name:
                          item.road_address?.address_name || item.address_name,
                    });
                  }
                });
                return combined;
              });
            }
          }
      );
    });
  };

  const handleSelect = (item: any) => {
    const address = item.road_address_name || item.address_name;
    const lat = item.y;
    const lng = item.x;
    const zip = item.road_address?.zone_no || item.address?.b_code || "";
    const sido =
        item.road_address?.region_1depth_name ||
        item.address?.region_1depth_name ||
        "";
    const sigungu =
        item.road_address?.region_2depth_name ||
        item.address?.region_2depth_name ||
        "";

    onSelect({
      businessAddress: address,
      latitude: lat,
      longitude: lng,
      zipcode: zip,
      sido,
      sigungu,
    });
    onClose();
  };

  return (
      <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
        <div className="bg-white p-4 flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={onClose}>
            <X className="h-5 w-5 text-black" />
          </Button>
          <h3 className="text-lg font-medium text-black">주소 검색</h3>
        </div>

        <div className="flex-1 bg-[#F5F5F5] p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-4 mb-4">
            <div className="flex gap-2">
              <Input
                  data-cy="address-search-keyword-input"
                  value={addressKeyword}
                  onChange={(e) => setAddressKeyword(e.target.value)}
                  placeholder="도로명, 지번, 건물명으로 검색"
                  onKeyDown={(e) => e.key === "Enter" && searchAddress()}
              />
              <Button
                  data-cy="address-search-button"
                  type="button"
                  onClick={searchAddress}
                  disabled={searchingAddress || !addressKeyword.trim()}
                  className="h-12 px-4"
              >
                {searchingAddress ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                    <Search className="h-4 w-4 mr-2" />
                )}
                검색
              </Button>
            </div>
          </div>

          {addressResults.length > 0 && (
              <div className="bg-white rounded-xl overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {addressResults.map((item, index) => (
                      <li
                          key={index}
                          data-cy="address-result-item"
                          className="p-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelect(item)}
                      >
                        <div className="flex items-start">
                          <Building className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {item.place_name !== item.address_name
                                  ? item.place_name
                                  : "주소"}
                            </p>
                            <p className="text-xs text-gray-600">
                              {item.road_address_name || item.address_name}
                            </p>
                            {item.road_address_name &&
                                item.road_address_name !== item.address_name && (
                                    <p className="text-xs text-gray-400">
                                      {item.address_name}
                                    </p>
                                )}
                          </div>
                        </div>
                      </li>
                  ))}
                </ul>
              </div>
          )}
        </div>
      </div>
  );
}
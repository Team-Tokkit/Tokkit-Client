"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchNearbyStores } from "./api/store-service"
import type { Store as StoreType, StoreSearchParams } from "./types"

import {
  loadKakaoMapScript,
  initializeMap,
  addCurrentLocationMarker,
  updateMarkers,
  calculateMapRadius,
} from "./utils/map-utils"

import StoreSearchButton from "./components/StoreSearchButton"
import StoreListToggleButton from "./components/StoreListToggleButton"
import StoreLocateButton from "./components/StoreLocateButton"
import StoreCategoryFilter from "./components/StoreCategoryFilter"
import StoreCategoryToggleButton from "./components/StoreCategoryToggleButton"
import StoreSearchInput from "./components/StoreSearchInput"
import StoreList from "./components/StoreList"
import { generateOverlayContent, injectOverlayStyles } from "./utils/map-overlay"

export type Store = StoreType

export default function OfflineStoresPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [stores, setStores] = useState<Store[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showList, setShowList] = useState(false)
  const [selectedStore, setSelectedStore] = useState<number | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const overlaysRef = useRef<any[]>([])
  const currentLocationMarkerRef = useRef<any>(null)
  const mapBoundsRef = useRef<any>(null)
  const scriptLoadAttemptRef = useRef(0)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          },
          () => setCurrentLocation({ lat: 37.5066, lng: 127.0557 })
      )
    }
  }, [])

  useEffect(() => {
    if (currentLocation) {
      loadKakaoMapScript(setIsMapLoaded, () => {
        initializeMap(
            mapRef,
            currentLocation,
            mapBoundsRef,
            fetchStores,
            () => addCurrentLocationMarker(mapRef, currentLocation, currentLocationMarkerRef),
            5
        )
      }, scriptLoadAttemptRef, setMapError)
    }
  }, [currentLocation])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const mapEl = document.getElementById("map")
      const clickedTarget = e.target as Node

      const ignoreSelectors = [
        ".custom-overlay",
        ".store-list",
        ".motion-div-filter",
        ".leaflet-marker-icon",
        "img[src*='marker']",
      ]

      const shouldIgnore = ignoreSelectors.some((selector) =>
          (clickedTarget instanceof Element) && clickedTarget.closest(selector)
      )

      if (mapEl?.contains(clickedTarget) && !shouldIgnore) {
        setShowFilters(false)
        setShowList(false)
        overlaysRef.current.forEach((overlay) => overlay.setMap(null))
        overlaysRef.current = []
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const fetchStores = async (params: StoreSearchParams) => {
    setIsLoading(true)
    try {
      const data = await fetchNearbyStores(params)
      setStores(data)
      updateMarkers(data, mapRef, markersRef, overlaysRef, setSelectedStore, createOverlay)
    } catch {
      setError("매장 정보를 불러오는데 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }
  const handleLocateUser = () => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude

          setCurrentLocation({ lat, lng }) // 상태도 업데이트
          if (mapRef.current) {
            const center = new window.kakao.maps.LatLng(lat, lng)
            mapRef.current.setCenter(center)
            searchByMapArea() // 위치 이동 후 검색까지 자동 수행
          }
        },
        () => {
          alert("현재 위치를 가져올 수 없습니다.")
        }
    )
  }
  const createOverlay = (store: Store, marker: any) => {
    if (!mapRef.current) return
    injectOverlayStyles()
    const content = generateOverlayContent(store)
    const position = marker.getPosition()
    const overlay = new window.kakao.maps.CustomOverlay({ position, content, map: mapRef.current, zIndex: 99 })
    overlaysRef.current.push(overlay)

    const onOutsideClick = (e: MouseEvent) => {
      const el = document.querySelector(".custom-overlay")
      if (el && !el.contains(e.target as Node)) {
        overlay.setMap(null)
        setSelectedStore(null)
        document.removeEventListener("click", onOutsideClick)
      }
    }

    setTimeout(() => {
      const closeBtn = document.querySelector(".overlay-close-btn")
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          overlay.setMap(null)
          setSelectedStore(null)
          document.removeEventListener("click", onOutsideClick)
        })
      }
      document.addEventListener("click", onOutsideClick)
    }, 100)
  }

  const searchByMapArea = () => {
    if (!mapRef.current) return
    const center = mapRef.current.getCenter()
    const bounds = mapRef.current.getBounds()
    const radius = calculateMapRadius(bounds) || 3000
    fetchStores({
      lat: center.getLat(),
      lng: center.getLng(),
      radius,
      storeCategory: selectedCategory !== "전체" ? selectedCategory : undefined,
      keyword: searchTerm || undefined,
    })
  }

  const handleStoreSelect = (id: number) => {
    const store = stores.find((s) => s.id === id)
    if (!store || !mapRef.current) return
    setSelectedStore(id)
    mapRef.current.setCenter(new window.kakao.maps.LatLng(store.latitude, store.longitude))
    overlaysRef.current.forEach((o) => o.setMap(null))
    overlaysRef.current = []
    const marker = markersRef.current.find((m: any) => m.storeId === store.id)

    if (marker) createOverlay(store, marker)
    setShowList(false)
  }

  return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col relative">
        <header className="bg-white p-4 shadow-sm z-10 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <StoreSearchInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onSearch={searchByMapArea}
              />
            </div>
            <StoreCategoryToggleButton show={showFilters} onToggle={() => setShowFilters(!showFilters)} />
          </div>
        </header>

        <StoreCategoryFilter
            show={showFilters}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
        />

        <div className="relative h-[calc(100vh-64px)]" ref={mapContainerRef}>
          <div id="map" className="w-full h-full" />
          <StoreSearchButton onClick={searchByMapArea} disabled={!isMapLoaded || !!mapError || isLoading} />
          <StoreListToggleButton showList={showList} onToggle={() => setShowList(!showList)} disabled={!isMapLoaded || !!mapError || isLoading} />
          <StoreLocateButton onClick={handleLocateUser} disabled={!isMapLoaded || !!mapError || isLoading} />
          <StoreList stores={stores} selectedStore={selectedStore} onSelect={handleStoreSelect} onClose={() => setShowList(false)} show={showList}  />
        </div>
      </div>
  )
}

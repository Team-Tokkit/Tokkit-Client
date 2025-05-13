// utils/map-utils.ts
import type { Store, StoreSearchParams } from "../types"
interface MarkerWithStoreId extends kakao.maps.Marker {
  storeId?: number
}
export const CATEGORIES = ["전체", "음식점", "의료", "서비스", "관광", "숙박", "교육"]
export const loadKakaoMapScript = (
    setIsMapLoaded: (val: boolean) => void,
    initializeMap: () => void,
    scriptLoadAttemptRef: React.MutableRefObject<number>,
    setMapError: (msg: string | null) => void
) => {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY
  scriptLoadAttemptRef.current++

  if (window.kakao && window.kakao.maps) {
    setIsMapLoaded(true)
    initializeMap()
    return
  }

  const existing = document.getElementById("kakao-map-script")
  if (existing) existing.remove()

  const script = document.createElement("script")
  script.id = "kakao-map-script"
  script.src = `${window.location.protocol}//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer,drawing&autoload=false`
  script.async = true
  script.defer = true

  script.onload = () => {
    window.kakao.maps.load(() => {
      setIsMapLoaded(true)
      initializeMap()
    })
  }

  script.onerror = () => {
    setMapError(`카카오맵 로드 실패 (시도 ${scriptLoadAttemptRef.current})`)
  }

  document.head.appendChild(script)
}

export const initializeMap = (
    mapRef: any,
    currentLocation: { lat: number; lng: number },
    mapBoundsRef: React.MutableRefObject<any>, // ← 타입 변경
    fetchStores: (params: StoreSearchParams) => void,
    addCurrentLocationMarker: () => void,
    DEFAULT_ZOOM_LEVEL: number
) => {
  if (!window.kakao || !window.kakao.maps || !currentLocation) return

  const container = document.getElementById("map")
  if (!container) return

  const options = {
    center: new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
    level: DEFAULT_ZOOM_LEVEL,
  }

  mapRef.current = new window.kakao.maps.Map(container, options)

  window.kakao.maps.event.addListener(mapRef.current, "bounds_changed", () => {
    mapBoundsRef.current = mapRef.current.getBounds()
  })


  const bounds = mapRef.current.getBounds()
  fetchStores({
    lat: currentLocation.lat,
    lng: currentLocation.lng,
    radius: calculateMapRadius(bounds),
  })

  addCurrentLocationMarker()
}


export const addCurrentLocationMarker = (
    mapRef: any,
    currentLocation: { lat: number; lng: number },
    currentLocationMarkerRef: any
) => {
  if (!mapRef.current || !currentLocation) return

  if (currentLocationMarkerRef.current) {
    currentLocationMarkerRef.current.setMap(null)
  }

  const markerImage = new window.kakao.maps.MarkerImage(
      "/images/current-location-marker.png",
      new window.kakao.maps.Size(40, 40),
      { offset: new window.kakao.maps.Point(20, 40) }
  )

  const position = new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng)
  const marker = new window.kakao.maps.Marker({
    position,
    map: mapRef.current,
    image: markerImage,
    zIndex: 10,
  })

  currentLocationMarkerRef.current = marker
}

export const updateMarkers = (
    stores: Store[],
    mapRef: any,
    markersRef: any,
    overlaysRef: any,
    setSelectedStore: (id: number | null) => void,
    createOverlay: (store: Store, marker: any) => void
) => {
  if (!mapRef.current || !window.kakao) return
  markersRef.current.forEach((m: any) => m.setMap(null))
  overlaysRef.current.forEach((o: any) => o.setMap(null))
  markersRef.current = []
  overlaysRef.current = []

  const markerImage = new window.kakao.maps.MarkerImage(
      "/images/tokkit-marker.png",
      new window.kakao.maps.Size(40, 40),
      { offset: new window.kakao.maps.Point(20, 40) }
  )

  stores.forEach((store) => {
    const position = new window.kakao.maps.LatLng(store.latitude, store.longitude)
    const marker = new window.kakao.maps.Marker({ position, map: mapRef.current, image: markerImage }) as MarkerWithStoreId
    marker.storeId = store.id // Store the store ID in the marker

    window.kakao.maps.event.addListener(marker, "click", () => {
      setSelectedStore(store.id)

      const yOffset = 100
      const projection = mapRef.current.getProjection()
      const point = projection.containerPointFromCoords(position)
      const adjusted = new window.kakao.maps.Point(point.x, point.y - yOffset)
      const newCenter = projection.coordsFromContainerPoint(adjusted)
      mapRef.current.setCenter(newCenter)

      overlaysRef.current.forEach((o: any) => o.setMap(null))
      overlaysRef.current = []
      createOverlay(store, marker)
    })

    markersRef.current.push(marker)
  })
}

export const calculateMapRadius = (bounds: any): number => {
  if (!bounds) return 3000
  try {
    const sw = bounds.getSouthWest()
    const ne = bounds.getNorthEast()

    const latDiff = ne.getLat() - sw.getLat()
    const lngDiff = ne.getLng() - sw.getLng()

    const latDistance = latDiff * 111000
    const lngDistance = lngDiff * 88740

    const radius = Math.sqrt(Math.pow(latDistance, 2) + Math.pow(lngDistance, 2)) / 2
    return Math.round(radius)
  } catch {
    return 3000
  }
}

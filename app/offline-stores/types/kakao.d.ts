declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (
            lat: number,
            lng: number,
        ) => {
          getLat(): number
          getLng(): number
        }
        Map: new (
            container: HTMLElement,
            options: any,
        ) => {
          setCenter(position: any): void
          setLevel(level: number): void
          getLevel(): number
          panTo(position: any): void
          getCenter(): any
          getBounds(): any
        }
        Marker: new (
            options: any,
        ) => {
          setMap(map: any): void
          setPosition(position: any): void
          setImage(markerImage: any): void
          setZIndex(zIndex: number): void
        }
        MarkerImage: new (src: string, size: any, options?: any) => void
        Size: new (width: number, height: number) => void
        Point: new (x: number, y: number) => any
        event: {
          addListener(target: any, type: string, handler: Function): void
        }
        InfoWindow: new (
            options: any,
        ) => {
          open(map: any, marker: any): void
          close(): void
          setContent(content: string): void
          setPosition(position: any): void
          setZIndex(zIndex: number): void
        }
        CustomOverlay: new (
            options: any,
        ) => {
          setMap(map: any): void
          setPosition(position: any): void
          setContent(content: string): void
          setZIndex(zIndex: number): void
        }
        services: {
          Geocoder: new () => {
            addressSearch(address: string, callback: (result: any[], status: any) => void): void
          }
          Status: {
            OK: string
            ZERO_RESULT: string
            ERROR: string
          }
        }
        MarkerClusterer: new (
            options: any,
        ) => {
          addMarkers(markers: any[]): void
          clear(): void
          setMinLevel(level: number): void
        }
        load(callback: () => void): void
      }
    }
  }
}
declare global {
  namespace kakao.maps {
    interface Marker {
      storeId?: number
    }
  }
}
export {}

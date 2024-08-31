// src/types/kakao-map.d.ts
declare module 'kakao.maps' {
    export interface LatLng {
      new(lat: number, lng: number): LatLng;
    }
    
    export interface Map {
      new(container: HTMLElement, options: any): Map;
      setCenter(center: LatLng): void;
    }
  
    export interface Marker {
      new(options: any): Marker;
    }
  }
  
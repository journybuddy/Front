import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const loadKakaoMapScript = (callback: () => void) => {
  const existingScript = document.getElementById('kakao-map-script') as HTMLScriptElement;
  if (existingScript) {
    // Script already added, just execute the callback
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=cd866a457c717cac35fd4372f0e43a7a&autoload=false';
  script.id = 'kakao-map-script';
  script.onload = () => {
    // Run the callback once the script has loaded
    callback();
  };

  document.head.appendChild(script);
};

export default function KakaoMap() {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    // Load the Kakao Map script
    loadKakaoMapScript(() => {
      if (window.kakao && window.kakao.maps) {
        // Initialize map once script is loaded
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          if (!container) return;

          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          const newMap = new window.kakao.maps.Map(container, options);
          setMap(newMap);

          const newMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(33.450701, 126.570667),
          });
          setMarker(newMarker);
          newMarker.setMap(newMap);
        });
      }
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

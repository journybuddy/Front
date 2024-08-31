import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapBox: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initMap = () => {
    if (!window.kakao || !window.kakao.maps) {
      setError('Kakao Maps SDK가 사용할 수 없습니다.');
      return;
    }

    const container = mapRef.current;
    if (!container) {
      setError('지도 컨테이너를 찾을 수 없습니다.');
      return;
    }

    try {
      const options = {
        center: new window.kakao.maps.LatLng(37.483034, 126.902435),
        level: 2,
      };
      new window.kakao.maps.Map(container, options);
    } catch (error) {
      setError(`Kakao Map 초기화 오류: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    // Check if Kakao Maps SDK is already loaded
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing`;
      script.async = true;
      script.onload = () => initMap();
      script.onerror = () => setError('Kakao Maps SDK를 로드하는 데 실패했습니다.');
      document.head.appendChild(script);

      // Clean up script when component unmounts
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div>
      {error && <div style={{ color: 'red' }}>오류: {error}</div>}
      <div id="map" style={{ width: '100vw', height: '100vh' }} ref={mapRef}></div>
    </div>
  );
};

export default MapBox;

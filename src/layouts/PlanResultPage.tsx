import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './PlanResultPage.styles';
import { savePlan } from '../apis/planService';

const KAKAO_APP_KEY = 'cd866a457c717cac35fd4372f0e43a7a';

export const PlanResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};

  const [planName, setPlanName] = useState('');
  const [groupedSchedules, setGroupedSchedules] = useState<{ [key: string]: any[] }>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState<any>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [highlightedMarker, setHighlightedMarker] = useState<any>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // 일정이 존재하는 경우, 날짜별로 그룹화
    if (plan?.schedules?.length) {
      const grouped = plan.schedules.reduce((acc: any, schedule: any) => {
        const dateTime = schedule.dateTime;
        const date = Array.isArray(dateTime)
          ? `${dateTime[0]}-${String(dateTime[1]).padStart(2, '0')}-${String(dateTime[2]).padStart(2, '0')}`
          : '';

        if (date) {
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(schedule);
        }
        return acc;
      }, {});

      setGroupedSchedules(grouped);
      console.log('Grouped Schedules:', grouped);

      const firstDate = Object.keys(grouped)[0];
      if (firstDate) {
        setSelectedDate(firstDate);
      }
    }
  }, [plan]);

  useEffect(() => {
    // 선택된 날짜와 일정에 따라 카카오 지도를 초기화
    const loadKakaoMap = () => {
      if (!window.kakao) {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
        script.onload = () => {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        };
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current) {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울을 기본 중심으로 설정
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapInstanceRef.current = map;

        // 기존 마커 제거
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = []; // 마커 배열 초기화

        const bounds = new window.kakao.maps.LatLngBounds();

        if (selectedDate && groupedSchedules[selectedDate]) {
          groupedSchedules[selectedDate].forEach((schedule: any, idx: number) => {
            const markerPosition = new window.kakao.maps.LatLng(parseFloat(schedule.latitude), parseFloat(schedule.longitude));

            // 기본 마커 이미지 설정
            const markerImage = new window.kakao.maps.MarkerImage(
              'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
              new window.kakao.maps.Size(24, 35),
            );

            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: map,
              title: schedule.placeName,
              image: markerImage,
            });

            markersRef.current.push(marker);

            // 클릭 이벤트를 설정하여 장소 정보를 업데이트하도록 수정
            window.kakao.maps.event.addListener(marker, 'click', () => {
              handleMarkerClick(schedule);
            });

            bounds.extend(markerPosition);
          });

          // 지도 범위 설정
          map.setBounds(bounds);
        }
      }
    };

    loadKakaoMap();
  }, [selectedDate, groupedSchedules]);

  const fetchPlaceInfo = async (address: string) => {
    try {
      const response = await fetch(`/plans/place-info?address=${encodeURIComponent(address)}`);
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }
      const data = await response.json();
      setSelectedPlaceInfo(data);
    } catch (error) {
      console.error('장소 정보 조회 중 오류 발생:', error);
      alert('장소 정보 조회 중 오류가 발생했습니다.');
    }
  };

  const handleSavePlan = async () => {
    if (!planName.trim()) {
      alert('여행 계획 이름을 입력해주세요.');
      return;
    }

    const planData = {
      planName: planName,
      startDate: plan.startDate,
      endDate: plan.endDate,
      transport: plan.transport,
      schedules: plan.schedules.map((schedule: any) => ({
        placeName: schedule.placeName,
        address: schedule.address,
        latitude: parseFloat(schedule.latitude),
        longitude: parseFloat(schedule.longitude),
        dateTime: schedule.dateTime,
        transport: schedule.transport,
      })),
    };

    try {
      const response = await savePlan(planData);
      if (response) {
        alert('여행 계획이 성공적으로 저장되었습니다.');
        navigate('/plans/list');
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('여행 계획 저장 중 오류가 발생했습니다.');
    }
  };

  const handleMarkerClick = (schedule: any) => {
    // 선택된 일정이 선택되었음을 나타내기 위해 상태 업데이트
    setSelectedSchedule(schedule);
    // 장소 정보 가져오기
    fetchPlaceInfo(schedule.address);
  };

  const handleScheduleClick = (schedule: any, idx: number) => {
    // 클릭된 일정이 선택되었음을 나타내기 위해 상태 업데이트
    setSelectedSchedule(schedule);

    // 장소 정보 가져오기
    fetchPlaceInfo(schedule.address);

    // 지도에서 클릭된 일정의 마커로 이동
    if (mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      const markerPosition = new window.kakao.maps.LatLng(
        parseFloat(schedule.latitude),
        parseFloat(schedule.longitude)
      );
      map.setCenter(markerPosition);
    }

    // 이전에 강조된 마커 복원
    if (highlightedMarker) {
      highlightedMarker.setImage(
        new window.kakao.maps.MarkerImage(
          'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
          new window.kakao.maps.Size(24, 35),
        )
      );
    }

    // 새로운 마커 강조
    const marker = markersRef.current[idx];
    if (marker) {
      marker.setImage(
        new window.kakao.maps.MarkerImage(
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          new window.kakao.maps.Size(24, 35),
        )
      );
      setHighlightedMarker(marker);
    }
  };

  return (
    <S.PageWrapper>
      <S.ContentWrapper>
        <S.ListContainer>
          <S.Header>
            <h2>생성된 여행 계획</h2>
          </S.Header>
          <S.SaveContainer>
            <input
              type="text"
              placeholder="여행 계획 이름"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
            <button onClick={handleSavePlan}>저장</button>
          </S.SaveContainer>
          <S.TabContainer>
            {Object.keys(groupedSchedules).map((date) => (
              <S.TabButton
                key={date}
                isActive={selectedDate === date}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </S.TabButton>
            ))}
          </S.TabContainer>
          <S.ScheduleContainer>
            {selectedDate && groupedSchedules[selectedDate]?.length ? (
              groupedSchedules[selectedDate].map((schedule: any, idx: number) => (
                <S.ScheduleCard
                  key={idx}
                  style={{
                    marginBottom: '20px',
                    border: selectedSchedule === schedule ? '2px solid #ff6347' : 'none',
                  }}
                  onClick={() => handleScheduleClick(schedule, idx)}
                >
                  <h4>{schedule.placeName}</h4>
                  <p>{schedule.address}</p>
                  <p>
                    {Array.isArray(schedule.dateTime) && schedule.dateTime.length >= 5
                      ? `${schedule.dateTime[0]}-${String(schedule.dateTime[1]).padStart(2, '0')}-${String(schedule.dateTime[2]).padStart(2, '0')} ${schedule.dateTime[3]}:${schedule.dateTime[4]}`
                      : '시간 정보 없음'}
                  </p>
                  <p>이동수단: {schedule.transport}</p>
                </S.ScheduleCard>
              ))
            ) : (
              <p>선택된 날짜에 일정이 없습니다.</p>
            )}
          </S.ScheduleContainer>
        </S.ListContainer>
        <div style={{ flex: 1 }}>
          <div
            id="map"
            style={{ width: '100%', height: '600px', marginBottom: '20px',  marginTop: '300px'  }}
            ref={mapRef}
          ></div>
          {selectedPlaceInfo && (
            <S.PlaceInfoContainer>
              <h3>장소 정보</h3>
              <p>장소명: {selectedPlaceInfo.name}</p>
              <p>주소: {selectedPlaceInfo.address}</p>
              <p>위도: {selectedPlaceInfo.latitude}</p>
              <p>경도: {selectedPlaceInfo.longitude}</p>
              {selectedPlaceInfo.website && (
                <p>
                  웹사이트: <a href={selectedPlaceInfo.website} target="_blank" rel="noopener noreferrer">{selectedPlaceInfo.website}</a>
                </p>
              )}
            </S.PlaceInfoContainer>
          )}
        </div>
      </S.ContentWrapper>
    </S.PageWrapper>
  );
};

export default PlanResultPage;

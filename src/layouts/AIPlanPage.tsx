import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './AIPlanPage.styles'; 
import { getTourInfo, searchPlaceByKeyword, createAIPlan } from '../apis/planService'; // API 호출 추가
import { FaRunning, FaMapMarkerAlt, FaLandmark, FaBed, FaUtensils } from 'react-icons/fa';

interface TourInfo {
  name: string;
  address: string;
  image?: string;
  url?: string;
  longitude?: string;
  latitude?: string;
  tel?: string;
}

const AIPlanPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { planData } = location.state || {};
  const { areaCode, sigunguCode, destination, startDate, endDate, periodMessage, themes } = planData || {};

  const [plan, setPlan] = useState<string[]>([]);
  const [preference, setPreference] = useState(''); 
  const [places, setPlaces] = useState<TourInfo[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<TourInfo[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<TourInfo[]>([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    console.log('Location state:', planData);
  }, [planData]);

  useEffect(() => {
    console.log('Area Code:', areaCode, 'Sigungu Code:', sigunguCode);

    const fetchTourInfo = async () => {
      if (preference && areaCode && sigunguCode) {
        try {
          const response = await getTourInfo(areaCode, sigunguCode, preference);
          console.log('API Response:', response);
          setPlaces(response.tourInfoList || []);
        } catch (error) {
          console.error('Error fetching tour info:', error);
        }
      }
    };
    fetchTourInfo();
  }, [preference, areaCode, sigunguCode]);

  const handleCollaborativeEdit = () => {
    navigate('/collaborative-edit', { state: { plan } });
  };

  const handlePreferenceChange = (newPreference: string) => {
    console.log('Selected preference:', newPreference);
    setPreference(newPreference);
  };

  const handleAddToPlan = (place: TourInfo) => {
    setSelectedPlaces((prevPlaces) => [...prevPlaces, place]);
  };

  const handleSearch = async () => {
    if (searchKeyword.trim()) {
      try {
        const results = await searchPlaceByKeyword(searchKeyword);
        console.log('Search Results:', results);
        setSearchResults(results || []);
      } catch (error) {
        console.error('Error searching for places:', error);
      }
    }
  };

  const handleCompletePlan = async () => {
    if (!startDate || !endDate || selectedPlaces.length === 0) {
      alert("여행 일정 및 장소를 선택해 주세요.");
      return;
    }

    setLoading(true); // 로딩 시작

    const planRequestBody = {
      startDate,
      endDate,
      transport: "car",  // 원하는 교통수단 입력
      selectedPlaces: selectedPlaces.map((place) => ({
        name: place.name,
        address: place.address,
        latitude: parseFloat(place.latitude || "0"),
        longitude: parseFloat(place.longitude || "0"),
      })),
    };

    try {
      const response = await createAIPlan(planRequestBody);
      console.log("AI 여행 계획 생성 응답:", response);

      setLoading(false); // 로딩 종료

      // 여행 계획 결과 페이지로 이동
      navigate('/plan-result', { state: { plan: response } });
    } catch (error) {
      console.error("여행 계획 생성 중 오류 발생:", error);
      alert("여행 계획을 생성하는 도중 문제가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <S.PageWrapper>
       {loading ? ( // 로딩 중일 때 보여줄 화면
        <S.LoadingContainer>
          
          <S.Spinner />
        </S.LoadingContainer>
      ) : (
        <>
      <S.Header>
        <h2>AI가 제안한 여행 플랜</h2>
      </S.Header>

      <S.PreferenceButtons>
        <button onClick={() => handlePreferenceChange('레포츠')}>
          <FaRunning /> 레포츠
        </button>
        <button onClick={() => handlePreferenceChange('관광지')}>
          <FaMapMarkerAlt /> 관광지
        </button>
        <button onClick={() => handlePreferenceChange('문화시설')}>
          <FaLandmark /> 문화시설
        </button>
        <button onClick={() => handlePreferenceChange('숙박')}>
          <FaBed /> 숙박
        </button>
        <button onClick={() => handlePreferenceChange('음식점')}>
          <FaUtensils /> 음식점
        </button>
      </S.PreferenceButtons>

      <S.PlacesContainer>
        {places.length > 0 ? (
          <ul>
            {places.map((place, index) => (
              <S.PlaceItem key={index}>
                {place.image ? (
                  <S.PlaceImage src={place.image} alt={place.name} />
                ) : (
                  <S.EmptyPlaceImage>
                   
                  </S.EmptyPlaceImage>
                )}
                <div>
                  <h4>{place.name}</h4>
                  <p>{place.address}</p>
                  {place.tel && <p>전화번호: {place.tel}</p>}
                  <button onClick={() => handleAddToPlan(place)}>추가하기</button>
                </div>
              </S.PlaceItem>
            ))}
          </ul>
        ) : (
          <p>{preference ? `${preference} 추천 장소를 불러오는 중...` : '추천 장소를 선택해 주세요.'}</p>
        )}
      </S.PlacesContainer>

      <S.SearchContainer>
        <input
          type="text"
          placeholder="장소 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </S.SearchContainer>

      <S.PlacesContainer>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((place, index) => (
              <S.PlaceItem key={index}>
                {place.image ? (
                  <S.PlaceImage src={place.image} alt={place.name} />
                ) : (
                  <S.EmptyPlaceImage>
                    
                  </S.EmptyPlaceImage>
                )}
                <div>
                  <h4>{place.name}</h4>
                  <p>{place.address}</p>
                  {place.url && (
                    <a href={place.url} target="_blank" rel="noopener noreferrer">
                      자세히 보기
                    </a>
                  )}
                  <button onClick={() => handleAddToPlan(place)}>추가하기</button>
                </div>
              </S.PlaceItem>
            ))}
          </ul>
        ) : (
          <p>{searchKeyword ? `검색 결과가 없습니다.` : '장소를 검색하세요.'}</p>
        )}
      </S.PlacesContainer>

      <S.SelectedPlacesContainer>
        <h3>내 플랜</h3>
        {selectedPlaces.length > 0 ? (
          <ul>
            {selectedPlaces.map((place, index) => (
              <S.PlaceItem key={index}>
                {place.image ? (
                  <S.PlaceImage src={place.image} alt={place.name} />
                ) : (
                  <S.EmptyPlaceImage>
                    
                  </S.EmptyPlaceImage>
                )}
                <div>
                  <h4>{place.name}</h4>
                  <p>{place.address}</p>
                  {place.tel && <p>전화번호: {place.tel}</p>}
                </div>
              </S.PlaceItem>
            ))}
          </ul>
        ) : (
          <p>아직 선택된 장소가 없습니다.</p>
        )}
      </S.SelectedPlacesContainer>

      {/* 완료하기 버튼 추가 */}
      <S.Buttons>
        <button onClick={handleCollaborativeEdit}>공동 편집</button>
        <button onClick={handleCompletePlan}>완료하기</button> {/* 완료하기 버튼 */}
      </S.Buttons>

      </>
      )}
    </S.PageWrapper>
  );
};

export default AIPlanPage;

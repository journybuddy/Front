import React, { useState, useEffect } from 'react';
import * as S from '../Modal/PlanModal.styels'; // 스타일 파일 경로 수정
import { differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getProvinces, getCities, createPlan } from '../../apis/planService'; // API 호출 함수 임포트
import { FaCar, FaBus, FaTrain, FaPlane } from 'react-icons/fa'; // 아이콘 임포트

interface Province {
  code: string;
  name: string;
}

interface City {
  code: string;
  name: string;
}

interface PlanModalProps {
  open: boolean;
  onClose: () => void;
}

const PlanModal: React.FC<PlanModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [periodMessage, setPeriodMessage] = useState('');
  const [isDateComplete, setIsDateComplete] = useState(false);
  const [themeSelectionError, setThemeSelectionError] = useState(false);
  const [transport, setTransport] = useState('car'); // 교통수단 상태 추가

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>('');
  const [selectedCityCode, setSelectedCityCode] = useState<string>('');

  // 특별시/도 목록을 API로부터 가져옴
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvinceCode) {
        try {
          const data = await getCities(selectedProvinceCode);
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [selectedProvinceCode]);

  // 날짜 선택 시 여행 기간 자동 계산
  const calculatePeriod = () => {
    if (startDate && endDate) {
      const days = differenceInDays(endDate, startDate) + 1;

      if (days === 1) {
        setPeriodMessage('당일여행으로 설정되었습니다.');
      } else if (days === 2) {
        setPeriodMessage('1박 2일 여행으로 설정되었습니다.');
      } else if (days <= 3) {
        setPeriodMessage('2박 3일 여행으로 설정되었습니다.');
      } else {
        setPeriodMessage('최대 2박 3일까지 가능합니다.');
      }

      if (days > 3) {
        setPeriodMessage('최대 2박 3일까지 가능합니다.');
      }
    }
  };

  const handleDateComplete = () => {
    calculatePeriod();
    setIsDateComplete(true);
  };

  const handleFinalComplete = async () => {
    if (selectedThemes.length < 2) {
      setThemeSelectionError(true);
      return;
    }

    const planData = {
      startDate: startDate?.toISOString() || '',
      endDate: endDate?.toISOString() || '',
      transport,
      selectedPlaces: [
        {
          name: destination,
          address: '',
          latitude: 0,
          longitude: 0
        }
      ],
      areaCode: selectedProvinceCode,
      sigunguCode: selectedCityCode
    };

    try {
      const response = await createPlan(planData);
      console.log('Plan created:', response);
      navigate('/ai-generate-plan', { state: { planData } });
      onClose();
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  const handleNext = () => {
    if (step === 4 && selectedThemes.length < 2) {
      setThemeSelectionError(true);
      return;
    }
    setThemeSelectionError(false);
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // 특별시/도 선택 시 처리 함수
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    setSelectedProvinceCode(selectedCode);
    setSelectedCityCode('');
  };

  // 시/군/구 선택 시 처리 함수
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityCode(e.target.value);
  };

  // 테마 선택 처리 함수
  const handleThemeChange = (value: string) => {
    const newSelectedThemes = selectedThemes.includes(value)
      ? selectedThemes.filter((v) => v !== value)
      : [...selectedThemes, value];

    setSelectedThemes(newSelectedThemes);

    if (newSelectedThemes.length < 2) {
      setThemeSelectionError(true);
    } else {
      setThemeSelectionError(false);
    }
  };

  // 교통수단 선택 처리 함수
  const handleTransportChange = (value: string) => {
    setTransport(value);
  };
  return open ? (
    <S.PlanModalWrap show={open} onClick={onClose}>
      <S.PlanModalContainer onClick={(e) => e.stopPropagation()}>
        <S.PlanModalInner>
          <S.Header>
            <h2>여행 계획 생성하기</h2>
            <S.CuteButton onClick={onClose} className="close-button">&times;</S.CuteButton>
          </S.Header>

          <S.PlanModalContent>
            {step === 1 && (
              <div>
                <h3>여행 지역을 선택해 주세요</h3>
                <div>
                  <S.CuteLabel>
                    <select value={selectedProvinceCode} onChange={handleProvinceChange}>
                      <option value="">특별시/도를 선택하세요</option>
                      {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </S.CuteLabel>
                </div>
                {selectedProvinceCode && (
                  <div>
                    <S.CuteLabel>
                      <select value={selectedCityCode} onChange={handleCityChange}>
                        <option value="">시/군/구를 선택하세요</option>
                        {cities.map((city) => (
                          <option key={city.code} value={city.code}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </S.CuteLabel>
                  </div>
                )}
                <div className="btn">
                  <S.CuteButton onClick={handleNext} disabled={!selectedCityCode}>
                    다음
                  </S.CuteButton>
                </div>
              </div>
            )}

{step === 2 && (
              <div>
                <h3>여행 날짜를 선택해주세요</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.CuteLabel>
                    <input
                      type="date"
                      value={startDate ? startDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => setStartDate(new Date(e.target.value))}
                      placeholder="출발 날짜"
                    />
                  </S.CuteLabel>
                  <S.CuteLabel>
                    <input
                      type="date"
                      value={endDate ? endDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const newEndDate = new Date(e.target.value);
                        setEndDate(newEndDate);
                        calculatePeriod();
                      }}
                      placeholder="돌아오는 날짜"
                    />
                  </S.CuteLabel>
                  <S.CuteButton onClick={handleDateComplete} style={{ marginLeft: '10px' }}>확인</S.CuteButton>
                </div>
                {periodMessage && <p>{periodMessage}</p>}
                <div className="btn">
                  <S.CuteButton onClick={handleBack}>뒤로</S.CuteButton>
                  <S.CuteButton onClick={handleNext} disabled={!isDateComplete}>다음</S.CuteButton>
                </div>
              </div>
            )}
{step === 3 && (
  <div>
    <h3>여행 테마를 선택해주세요 (최소 2개)</h3>
    <div>
      <S.CuteLabel>
        <input
          type="checkbox"
          value="휴식"
          checked={selectedThemes.includes('휴식')}
          onChange={() => handleThemeChange('휴식')}
        />
        휴식
      </S.CuteLabel>
      <S.CuteLabel>
        <input
          type="checkbox"
          value="모험"
          checked={selectedThemes.includes('모험')}
          onChange={() => handleThemeChange('모험')}
        />
        모험
      </S.CuteLabel>
      <S.CuteLabel>
        <input
          type="checkbox"
          value="문화"
          checked={selectedThemes.includes('문화')}
          onChange={() => handleThemeChange('문화')}
        />
        문화
      </S.CuteLabel>
      <S.CuteLabel>
        <input
          type="checkbox"
          value="자연"
          checked={selectedThemes.includes('자연')}
          onChange={() => handleThemeChange('자연')}
        />
        자연
      </S.CuteLabel>
      {themeSelectionError && <p>테마는 최소 2개 이상 선택해야 합니다.</p>}
    </div>
    <div className="btn">
      <S.CuteButton onClick={handleBack}>뒤로</S.CuteButton>
      <S.CuteButton onClick={handleNext} disabled={selectedThemes.length < 2}>다음</S.CuteButton>
    </div>
  </div>
)}

{step === 4 && (
  <div>
    <h3>교통수단을 선택해 주세요</h3>
    <div>
      <S.CuteLabel>
        <input
          type="radio"
          name="transport"
          value="car"
          checked={transport === 'car'}
          onChange={() => handleTransportChange('car')}
        />
        <FaCar /> 자동차
      </S.CuteLabel>
      <S.CuteLabel>
        <input
          type="radio"
          name="transport"
          value="bus"
          checked={transport === 'bus'}
          onChange={() => handleTransportChange('bus')}
        />
        <FaBus /> 버스
      </S.CuteLabel>
      <S.CuteLabel>
        <input
          type="radio"
          name="transport"
          value="train"
          checked={transport === 'train'}
          onChange={() => handleTransportChange('train')}
        />
        <FaTrain /> 기차
      </S.CuteLabel>
      <S.CuteLabel>
        <input
          type="radio"
          name="transport"
          value="plane"
          checked={transport === 'plane'}
          onChange={() => handleTransportChange('plane')}
        />
        <FaPlane /> 비행기
      </S.CuteLabel>
    </div>
    <div className="btn">
      <S.CuteButton onClick={handleBack}>뒤로</S.CuteButton>
      <S.CuteButton onClick={handleFinalComplete}>완료</S.CuteButton>
    </div>
  </div>
)}
  </S.PlanModalContent>
        </S.PlanModalInner>
      </S.PlanModalContainer>
    </S.PlanModalWrap>
  ) : null;
};

export default PlanModal;
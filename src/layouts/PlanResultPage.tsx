// src/pages/PlanResultPage.tsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './PlanResultPage.styles';
import { savePlan } from '../apis/planService'; // 저장 API 호출 함수

const PlanResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {};
  
  const [planName, setPlanName] = useState('');
  const [groupedSchedules, setGroupedSchedules] = useState<{ [key: string]: any[] }>({});
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
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

      const firstDate = Object.keys(grouped)[0];
      if (firstDate) {
        setSelectedDate(firstDate);
      }
    }
  }, [plan]);

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
        navigate('/plans/list'); // 목록 페이지로 이동
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('여행 계획 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <S.PageWrapper>
      <S.Header>
        <h2>생성된 여행 계획</h2>
      </S.Header>
      <div>
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
              <S.ScheduleCard key={idx} style={{ marginBottom: '20px' }}>
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
            <p>일정이 없습니다.</p>
          )}
        </S.ScheduleContainer>
      </div>
      <S.SaveContainer>
        <input
          type="text"
          placeholder="여행 계획 이름"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
        <button onClick={handleSavePlan}>여행 계획 저장</button>
      </S.SaveContainer>
    </S.PageWrapper>
  );
};

export default PlanResultPage;

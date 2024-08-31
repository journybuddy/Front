// src/pages/PlanDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './PlanDetailPage.styles';
import { getPlanDetail } from '../apis/planService'; 

const PlanDetailPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const loadPlanDetail = async () => {
      try {
        if (planId) {
          const response = await getPlanDetail(parseInt(planId, 10));
          setPlan(response);
        } else {
          console.error('planId is undefined');
        }
      } catch (error) {
        console.error('여행 계획 상세 조회 중 오류 발생:', error);
      }
    };

    loadPlanDetail();
  }, [planId]);

  return (
    <S.PageWrapper>
      <S.Header>
        <h2>여행 계획 상세</h2>
      </S.Header>
      {plan ? (
        <div>
          <h3>{plan.name}</h3>
          <p>시작일: {plan.startDate}</p>
          <p>종료일: {plan.endDate}</p>
          <p>교통수단: {plan.transport}</p>
          <S.ScheduleContainer>
            {plan.schedules.map((schedule: any, idx: number) => (
              <S.ScheduleCard key={idx}>
                <h4>{schedule.placeName}</h4>
                <p>{schedule.address}</p>
                <p>
                  {schedule.dateTime
                    ? new Date(schedule.dateTime).toLocaleString()
                    : '시간 정보 없음'}
                </p>
                <p>이동수단: {schedule.transport}</p>
              </S.ScheduleCard>
            ))}
          </S.ScheduleContainer>
        </div>
      ) : (
        <p>여행 계획을 불러오는 중입니다...</p>
      )}
    </S.PageWrapper>
  );
};

export default PlanDetailPage;

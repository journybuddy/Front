import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './PlanListPage.styles'; // 스타일 파일 경로에 맞게 수정
import {  getPlans } from '../apis/planService'; // 여행 계획 목록 조회 API 호출 함수 추가

const PlanListPage: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const navigate = useNavigate();

  // 여행 계획 목록을 조회
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const response = await  getPlans();
        setPlans(response);
      } catch (error) {
        console.error('여행 계획 목록 조회 중 오류 발생:', error);
      }
    };

    loadPlans();
  }, []);

  const handlePlanClick = (planId: number) => {
    navigate(`/plans/${planId}`);
  };

  return (
    <S.PageWrapper>
      <S.Header>
        <h2>저장된 여행 계획 목록</h2>
      </S.Header>
      <S.PlanList>
        {plans.length ? (
          plans.map((plan: any) => (
            <S.PlanItem key={plan.planId} onClick={() => handlePlanClick(plan.planId)}>
              {plan.name}
            </S.PlanItem>
          ))
        ) : (
          <p>저장된 여행 계획이 없습니다.</p>
        )}
      </S.PlanList>
    </S.PageWrapper>
  );
};

export default PlanListPage;

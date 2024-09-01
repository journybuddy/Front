// src/pages/PlanListPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './PlanListPage.styles';
import { getPlans } from '../apis/planService';

const PlanListPage: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const response = await getPlans({ page, size });
        setPlans(response);
        setError(null); // 성공 시 에러 초기화
      } catch (error) {
        setError('여행 계획 목록 조회 중 오류가 발생했습니다.');
        console.error('여행 계획 목록 조회 중 오류 발생:', error);
      }
    };

    loadPlans();
  }, [page, size]);

  const handlePlanClick = (planId: number) => {
    navigate(`/plans/${planId}`);
  };

  return (
    <S.PageWrapper>
      <S.Header>
        <h2>저장된 여행 계획 목록</h2>
      </S.Header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <S.PlanList>
        {plans.length ? (
          plans.map((plan: any) => (
            <S.PlanItem key={plan.planId} onClick={() => handlePlanClick(plan.planId)}>
              <S.PlanCard>
                <S.PlanTitle>{plan.name}</S.PlanTitle>
                <S.PlanDetails>
                  <p>{plan.startDate} - {plan.endDate}</p>
                  <p>교통수단: {plan.transport}</p>
                </S.PlanDetails>
              </S.PlanCard>
            </S.PlanItem>
          ))
        ) : (
          <p>저장된 여행 계획이 없습니다.</p>
        )}
      </S.PlanList>
      <S.Pagination>
        <button onClick={() => setPage(page > 0 ? page - 1 : 0)} disabled={page === 0}>
          이전
        </button>
        <span>페이지 {page + 1}</span>
        <button onClick={() => setPage(page + 1)}>
          다음
        </button>
      </S.Pagination>
    </S.PageWrapper>
  );
};

export default PlanListPage;

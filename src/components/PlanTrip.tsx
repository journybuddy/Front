import React, { useState } from 'react';
import PlanModal from '../components/Modal/PlanModal'; // 모달 컴포넌트 가져오기

const PlanTrip: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <h1>여행 계획 만들기</h1>
      <p>여행지를 선택하고, 날짜와 선호도를 입력하세요.</p>
      {/* 생성하기 버튼 추가 */}
      <button onClick={openModal}>생성하기</button>

      {/* 모달 컴포넌트 렌더링 */}
      <PlanModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default PlanTrip;

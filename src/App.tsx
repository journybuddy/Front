// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './views/MainPage';
import UserInfoComponent from './components/UserInfo';
import PlanTrip from './components/PlanTrip';
import AIPlanPage from './layouts/AIPlanPage';
import KakaoRedirect from './components/KaKaoRedirect';
import PlanResultPage from './layouts/PlanResultPage';
import PlanListPage from './layouts/PlanListPage';  // 여행 계획 목록 페이지
import PlanDetailPage from './layouts/PlanDetailPage';  // 여행 계획 상세 페이지

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/userinfo" element={<UserInfoComponent />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/journeybuddy/oauth/*" element={<KakaoRedirect />} />
        <Route path="/ai-generate-plan" element={<AIPlanPage />} />
        <Route path="/plan-result" element={<PlanResultPage />} />  {/* 여행 계획 결과 페이지 */}
        <Route path="/plans/:planId" element={<PlanDetailPage />} />
        <Route path="/plans/list" element={<PlanListPage />} />
      </Routes>
    </Router>
  );
};

export default App;

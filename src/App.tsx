import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './views/MainPage';
import UserInfoComponent from './components/UserInfo';
import PlanTrip from './components/PlanTrip';
import AIPlanPage from './layouts/AIPlanPage';
import KakaoRedirect from './components/KaKaoRedirect';
import PlanResultPage from './layouts/PlanResultPage';
import PlanListPage from './layouts/PlanListPage';
import PlanDetailPage from './layouts/PlanDetailPage';
import MapBox from './components/MapTest';  // 경로가 올바른지 확인하세요

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/userinfo" element={<UserInfoComponent />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/journeybuddy/oauth/*" element={<KakaoRedirect />} />
        <Route path="/ai-generate-plan" element={<AIPlanPage />} />
        <Route path="/plan-result" element={<PlanResultPage />} />
        <Route path="/plans/:planId" element={<PlanDetailPage />} />
        <Route path="/plans/list" element={<PlanListPage />} />
        <Route path="/map" element={<MapBox />} />
      </Routes>
    </Router>
  );
};

export default App;

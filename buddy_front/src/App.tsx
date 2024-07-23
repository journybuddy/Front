// src/App.tsx
// 전체 애플리케이션의 진입점 컴포넌트
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './views/MainPage';
import KakaoRedirect from './components/KaKaoRedirect'; // CSS 문제 해결 후 확인

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/journeybuddy/oauth/*" element={<KakaoRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;
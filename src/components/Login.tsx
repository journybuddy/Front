import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { getKakaoToken, loginWithKakao } from '../apis/auth';
import './Login.css'; // Import the CSS file
import Logo from '../assets/styles/banner/Logo.png';

const Login: React.FC = () => {
  //const { setUser } = useAuth();
  return (
    <div className="login-container">
      <div className="login-background">
      <img className="login-logo" src={Logo} alt="Logo" />
      <div className="login-title">져니버디와 함께하세요!</div>
      <div className="login-subtitle">친구와 함께하는 스마트한 여행,</div>
      
      {/* Kakao Login Button */}
      <a href={KAKAO_AUTH_URL} className="kakao-login-button">
        <div className="kakao-login-text">카카오 로그인하기</div>
      </a>
      <div className="sign-up-container">
        <div className="sign-up-text">신규 사용자이신가요?</div>
        <div className="sign-up-link">회원가입</div>
      </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirect: React.FC = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    const sendCodeToBackend = async () => {
      try {
        if (code && backendUrl) {
          const response = await axios.post(`${backendUrl}/api/auth/kakao`, { code });
          console.log('Server response:', response.data);
        } else {
          console.error('Authorization code or backend URL not found.');
        }
      } catch (error) {
        console.error('Error sending code to backend:', error);
      }
    };

    sendCodeToBackend();
  }, [code, backendUrl]); // backendUrl을 의존성 배열에 추가합니다.

  return (
    <div>
      로그인 중입니다.
      <p>Code: {code}</p>
      <div className="spinner"></div>
    </div>
  );
};

export default KakaoRedirect;

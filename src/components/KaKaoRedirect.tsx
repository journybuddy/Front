import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirect = () => {
  const [status, setStatus] = useState('로그인 중입니다.');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    const sendCodeToBackend = async () => {
      try {
        if (code && backendUrl) {
          // POST 요청을 보내서 백엔드에서 JWT 토큰을 요청합니다.
          const response = await axios.post(`${backendUrl}/api/auth/kakao`, null, {
            params: { code }
          });
          console.log('Server response:', response.data);

          // JWT 토큰을 받아서 상태를 업데이트합니다.
          if (response.data.jwtToken) {
            localStorage.setItem('jwtToken', response.data.jwtToken);
            setStatus('로그인 성공!');
          } else {
            setStatus(response.data.message || '로그인 실패.');
          }
        } else {
          console.error('Authorization code or backend URL not found.');
          setStatus('인증 코드 또는 백엔드 URL을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('Error sending code to backend:', error);
        setStatus('백엔드로 인증 코드를 보내는 중 오류가 발생했습니다.');
      }
    };

    sendCodeToBackend();
  }, [location.search, backendUrl]);

  return (
    <div>
      <p>{status}</p>
      <div className="spinner"></div>
    </div>
  );
};

export default KakaoRedirect;
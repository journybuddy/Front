import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirect: React.FC = () => {
  const [status, setStatus] = useState('로그인 중입니다.');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 추가
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code'); // 인가코드 추출

  useEffect(() => {
    const sendCodeToBackend = async () => {
      try {
        if (code && backendUrl) {
          const response = await axios.post(`${backendUrl}/api/auth/kakao?code=${code}`);
          const jwtToken = response.data;
          localStorage.setItem('jwtToken', jwtToken);
          console.log('JWT Token saved:', jwtToken); // 토큰이 올바르게 저장되었는지 확인
          setStatus('로그인 성공');

          // 약간의 지연을 추가하여 페이지가 빨리 지나가지 않도록 합니다.
          setTimeout(() => {
            setIsLoading(false);
            navigate('/userinfo');
          }, 2000); // 2초 지연

        } else {
          console.error('Authorization code or backend URL not found.');
          setStatus('로그인 실패: 인가 코드 또는 백엔드 URL을 찾을 수 없습니다.');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error details:', error.response?.data);
        } else {
          console.error('Unexpected error:', error);
        }
        setStatus('로그인 실패: 서버와의 통신 오류');
      }
    };
    sendCodeToBackend();
  }, [code, backendUrl, navigate]);

  return (
    <div>
      <p>{status}</p>
      {isLoading && <div className="spinner"></div>} {/* 로딩 상태일 때만 spinner 표시 */}
    </div>
  );
};

export default KakaoRedirect;

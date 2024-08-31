import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<any>(null); // 사용자 정보 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate(); // 페이지 이동을 위한 훅 사용

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
          throw new Error('JWT token not found');
        }

        const response = await axios.get(`${backendUrl}/api/auth/kakao/info`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });

        console.log('Response Data:', response.data.user); // 응답 데이터 구조 확인

        // 응답 데이터의 result 필드에서 사용자 정보 가져오기
        setUser(response.data.user);
      } catch (err: any) {
        // 오류 메시지를 더 명확하게 처리
        setError(err.response?.data?.error || '사용자 정보를 가져오는 데 실패했습니다.');
        console.error('Fetch User Info Error:', err);
      } finally {
        setLoading(false); // 로딩 상태를 false로 설정
      }
    };

    fetchUserInfo();
  }, [backendUrl]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;
  if (!user) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h1>사용자 정보</h1>
      <p>닉네임: {user.nickname}</p>
      <p>이메일: {user.email}</p>
      <p>프로필 이미지: <img src={user.profile_image} alt={`${user.nickname}'s profile`} /></p>
      
      {/* 여행계획 만들기 버튼 추가 */}
      <button onClick={() => navigate('/plan-trip')}>
        여행계획 만들러 가기
      </button>
    </div>
  );
};

export default UserInfo;

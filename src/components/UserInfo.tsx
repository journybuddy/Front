import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<any>(null); // 사용자 정보 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
        console.log('User Info Response:', response.data); // 응답 데이터 확인
        setUser(response.data);
      } catch (err) {
        setError('사용자 정보를 가져오는 데 실패했습니다.');
        console.error(err);
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
      <p>닉네임: {user.user?.nickname}</p>
      <p>이메일: {user.user?.email}</p>
      {/* 필요한 다른 사용자 정보 표시 */}
    </div>
  );
};

export default UserInfo;

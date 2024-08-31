import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // 백엔드 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 JWT 토큰 가져오기
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // JWT 토큰을 Authorization 헤더에 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가 (선택 사항)
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // 응답 데이터 처리
//     return response;
//   },
//   (error) => {
//     // 응답 오류 처리
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

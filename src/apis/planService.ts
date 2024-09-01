// src/api/planService.ts

import axiosInstance from './axiosInstance';



interface PlanRequest {
  startDate: string;
  endDate: string;
  transport: string;
  selectedPlaces: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }[];
}


interface Plan {
  planId: number;
  name: string;
  startDate: string;
  endDate: string;
  transport: string;
}

interface GetPlansParams {
  page?: number;
  size?: number;
}


export const createPlan = async (planData: PlanRequest) => {
  try {
    const response = await axiosInstance.post('/plans/start-ai', planData);
    return response.data; // 백엔드 응답 데이터 반환
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error; // 에러 발생 시 throw
  }
};




export const getProvinces = async () => {
  try {
    const response = await axiosInstance.get('/plans/provinces');
    return response.data; // 시/도 코드 데이터 반환
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error; // 에러 발생 시 throw
  }
};

export const getCities = async (provinceCode: string) => {
  if (!provinceCode) {
    throw new Error("provinceCode is required");
  }

  // URL 경로와 쿼리 파라미터 모두에 provinceCode를 포함
  const response = await fetch(`/plans/cities/${provinceCode}?provinceCode=${provinceCode}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch cities: ${errorText}`);
  }

  return await response.json();
};


//preference 별 장소리스트 가져오기
export const getTourInfo = async (areaCode: string, sigunguCode: string, preference: string) => {
  const response = await fetch(`/plans/tour-info?areaCode=${areaCode}&sigunguCode=${sigunguCode}&preference=${encodeURIComponent(preference)}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch tour info: ${errorText}`);
  }

  return await response.json();
};


//키워드로 직접 장소 검색
export const searchPlaceByKeyword = async (keyword: string) => {
  const response = await fetch(`/plans/search?keyword=${encodeURIComponent(keyword)}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to search places: ${errorText}`);
  }

  return await response.json();
};

//장소 추가 후 AI 플랜 생성
export const createAIPlan = async (planData: any) => {
  try {
    const response = await axiosInstance.post('/plans/start-ai', planData);
    return response.data;
  } catch (error) {
    console.error('Error creating AI plan:', error);
    throw error;
  }
};

//계획 저장
export const savePlan = async (planData: any) => {
  try {
    const response = await axiosInstance.post('/plans/save', planData);
    return response.data;
  } catch (error) {
    console.error('Error saving the plan:', error);
    throw error;
  }
};

// 여행 계획 상세 조회
export const getPlanDetail = async (planId: number) => {
  try {
    const response = await axiosInstance.get(`/plans/plan-info/${planId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching plan details:', error);
    throw error;
  }
};



export const getPlans = async ({ page = 0, size = 9 }: GetPlansParams): Promise<Plan[]> => {
  try {
    const response = await axiosInstance.get('/my_page/plans', {
      params: { page, size }
    });
    return response.data; // 성공적인 응답 데이터 반환
  } catch (error) {
    console.error('여행 계획 조회 중 오류 발생:', error);
    throw error; // 에러 발생 시 throw
  }
};
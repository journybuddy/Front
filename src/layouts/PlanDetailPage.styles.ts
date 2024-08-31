// src/pages/PlanDetailPage.styles.ts

import styled from 'styled-components';

export const PageWrapper = styled.div`
  background-color: #fff0f5; /* 연한 핑크색 배경 */
  padding: 20px;
  min-height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
  color: #555;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 2.5rem;
    color: #ff69b4; /* 진한 핑크색 */
  }
`;

export const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ScheduleCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 80%;
  max-width: 600px;

  h4 {
    font-size: 1.5rem;
    color: #ff69b4;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    color: #555;
  }

  & > p:first-child {
    font-weight: bold;
  }
`;

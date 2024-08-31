// src/pages/PlanListPage.styles.ts

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

export const PlanList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const PlanItem = styled.li`
  background-color: #ffffff;
  border: 1px solid #ff69b4;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff69b4;
    color: #ffffff;
  }
`;

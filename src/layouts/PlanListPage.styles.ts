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
  max-width: 800px;
  margin: 0 auto;
`;

export const PlanItem = styled.li`
  background-color: #ffffff;
  border: 1px solid #ff69b4;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 15px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ff69b4;
    color: #ffffff;
    transform: scale(1.02);
  }
`;

export const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
`;

export const PlanTitle = styled.h3`
  margin: 0;
  color: #ff69b4; /* 진한 핑크색 */
  font-size: 1.5rem;
`;

export const PlanDetails = styled.div`
  margin-top: 10px;
  color: #666;
`;

export const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #ff69b4;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &:hover {
      background-color: #e5533b;
      transform: scale(1.05);
    }
  }

  span {
    font-size: 1rem;
    color: #555;
  }
`;

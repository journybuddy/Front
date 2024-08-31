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

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  background-color: ${props => (props.isActive ? '#ff69b4' : '#fff')};
  color: ${props => (props.isActive ? '#fff' : '#ff69b4')};
  border: 1px solid #ff69b4;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff4081;
    color: white;
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

export const SaveContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    width: 300px;
  }

  button {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #ff69b4;
    color: white;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff4081;
    }
  }
`;

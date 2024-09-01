import styled from 'styled-components';

// shouldForwardProp을 사용하여 isActive와 같은 custom prop이 실제 HTML 요소에 전달되지 않도록 설정합니다.
export const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
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

export const PageWrapper = styled.div`
  background-color: #fff0f5; /* 연한 핑크색 배경 */
  padding: 20px;
  min-height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
  color: #555;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  max-width: 1200px; /* Set a max-width to control overall width */
  margin: 0 auto; /* Center the content */
`;

export const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const MapWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center; /* Center the map horizontally */
  align-items: flex-start;
  margin-top: 400px; /* Adjust the top margin to align with the schedule list */
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 600px; /* Adjust height as needed */
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
  margin-top: 20px;
  gap: 10px;
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
  width: 100%; /* Ensure it fills the container width */
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

export const PlaceInfoContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  color: #555;

  h3 {
    font-size: 1.5rem;
    color: #ff69b4;
    margin-bottom: 15px;
  }

  p {
    margin: 10px 0;
  }

  a {
    color: #ff69b4;
    text-decoration: underline;

    &:hover {
      color: #ff4081;
    }
  }
`;

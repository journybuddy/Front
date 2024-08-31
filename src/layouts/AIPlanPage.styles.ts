import styled from 'styled-components';
import buddyloading from '../assets/styles/buddy.png'; 

export const PageWrapper = styled.div`
  background-color: #ffe4e1; /* 연한 핑크색 배경 */
  padding: 20px;
  min-height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
  color: #555;
`;
export const ScrollableContainer = styled.div`
  max-height: 300px; // Adjust the height as needed
  overflow-y: auto; // Enable vertical scrolling
  margin: 20px 0; // Add margin to separate from other components
  background-color: #f9f9f9; /* 연한 회색 배경 */

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    margin-bottom: 10px;
  }
`;
export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 2.5rem;
    color: #ff69b4; /* 진한 핑크색 */
  }
`;

export const PreferenceButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;

  button {
    background-color: #ffc1cc; /* 파스텔톤 핑크색 */
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff69b4; /* 진한 핑크 */
    }
  }
`;




export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;

  input {
    border: 2px solid #ffc1cc;
    border-radius: 20px;
    padding: 10px 15px;
    width: 250px;
    outline: none;
    font-size: 1rem;

    &:focus {
      border-color: #ff69b4; /* 진한 핑크 */
    }
  }

  button {
    background-color: #ff69b4; /* 진한 핑크 */
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff4081; /* 더 진한 핑크 */
    }
  }
`;

export const SelectedPlacesContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    text-align: center;
    color: #ff69b4;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  p {
    text-align: center;
    color: #777;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  button {
    background-color: #ff69b4; /* 진한 핑크 */
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff4081; /* 더 진한 핑크 */
    }
  }
`;


export const PlacesContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* 리스트 아이템을 중앙 정렬 */
  }

  p {
    text-align: center;
    color: #777;
  }
`;

export const PlaceItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45%; /* 리스트 아이템의 가로 길이를 절반 정도로 줄임 */
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;

  h4 {
    margin: 0;
    color: #ff69b4;
  }

  p {
    margin: 5px 0;
    color: #777;
  }

  button {
    background-color: #ffc1cc;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff69b4;
    }
  }
`;

export const PlaceImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const EmptyPlaceImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: #f0f0f0;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #888;
`;


export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #ff69b4;
  font-size: 1.5rem;
  background-image: 
   url(${buddyloading});
  background-size: 60% 60%;
  background-position: top; 
  background-repeat: no-repeat; 
`;
export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ff69b4;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-top: 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
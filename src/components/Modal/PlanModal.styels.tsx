import styled from '@emotion/styled';
import bgImage from '../../assets/styles/planmodal_bg.png'; // 배경 이미지

export const PlanModalWrap = styled.div<{ show?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const PlanModalContainer = styled.div`
  position: relative;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  width: 600px; /* 모달의 폭을 고정 */
  max-width: 90%; 
  height: 400px;
  max-height: 90%;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const PlanModalInner = styled.div`
  padding: 20px;
`;

export const PlanModalContent = styled.div`
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 24px;
    color: pink; 
  }

  .close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: pink;
  }
`;

export const SearchInput = styled.input`
  width: 100%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  margin-top: 10px;
  background-color: #fff;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KPHBhdGggZD0iTTEyLDEwSDEwVjcuNkwxLjYsOC4zTDIuMSwyLjRsNyw3LjMtMTEuNC0xMS40LTEyLjdMMTAuOCwyLjRsMTEuMywxMS4zTDEyLDEwWiIvPjwvc3ZnPg==');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 24px 24px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ThemeSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;

    input {
      margin-right: 10px;
    }
  }
`;

export const NavigationButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

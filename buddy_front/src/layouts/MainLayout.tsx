//메인 레이아웃 - 처음 시작 페이지
import React, { ReactNode } from 'react';

//React.FC = React.FunctionComponent

//MainLayout 컴포넌트의 props 타입 정의 
interface MainLayoutProps {
    children: ReactNode;
  }

  
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
      <div>
        <header>Main Layout Header</header>
        <main>{children}</main>
        <footer>Main Layout Footer</footer>
      </div>
    );
};
export default MainLayout;

export {};
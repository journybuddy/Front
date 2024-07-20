import React from 'react';
import logo from '../assets/styles/Header_image/Logo.png';
import myImage from '../assets/styles/Header_image/myimage.png';
import './Header.css'; // CSS 파일을 import

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        
        {/* Logo */}
        <img className="logo" src={logo} alt="Logo" />
        
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-item">Home</div>
          <div className="nav-item">Plan</div>
          <div className="nav-item">MyPage</div>
          <div className="nav-item">Community</div>
        </nav>

        {/* Profile Image */}
        <div className="profile-container">
          <div className="profile-placeholder"></div>
          <img className="profile-image" src={myImage} alt="Profile" />
        </div>
      
      </div>
    </header>
  );
};

export default Header;


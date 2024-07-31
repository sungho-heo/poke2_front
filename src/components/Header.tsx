import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Notification from "./Notification";
import { Logo } from "../styles/CommonStyles";

// css
// 홈페이지 메인 타이틀
const LogoContainer = styled.h1`
  display: flex;
  width: 17%;
  align-items: center;
  justify-content: center;
`;

// header
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 50;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.3);
`;

// HeaderList
const HeaderList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
`;

const HeaderLink = styled.li`
  margin: 0 10px;
  padding-top: 45px;
  font-size: 20px;
  list-style: none;
`;

const Header: React.FC = () => {
  const { token, logout } = useAuth();
  const [notification, setNotification] = useState<string | null>(null);

  // 알림 매시지
  const showNotification = (message: string) => {
    setNotification(message);
  };

  const handleLogout = () => {
    logout(showNotification);
  };
  return (
    <HeaderContainer>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
      <LogoContainer>
        <Link to="/">
          <Logo src="./main.png" alt="Home" />
        </Link>
      </LogoContainer>
      <HeaderList>
        {!token ? (
          <ul>
            <HeaderLink>
              <Link to="/login">Login</Link>
            </HeaderLink>
            <HeaderLink>
              <Link to="/signup">Signup</Link>
            </HeaderLink>
          </ul>
        ) : (
          <ul>
            <HeaderLink>
              <Link to="/profile">Profile</Link>
            </HeaderLink>
            <HeaderLink>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </HeaderLink>
          </ul>
        )}
      </HeaderList>
    </HeaderContainer>
  );
};

export default Header;

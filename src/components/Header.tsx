import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Notification from "./Notification";
import { Logo } from "../styles/CommonStyles";
import { lightTheme } from "../themes";

// type
interface HeaderProps {
  toggleTheme: () => void;
  theme: any;
}
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
  background-color: ${({ theme }) => theme.backgroundColor};
  top: 0;
  left: 0;
  right: 0;
  height: 98px;
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.3);
`;

// HeaderList
const HeaderList = styled.div`
  padding: 30px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLink = styled.li`
  border-radius: 0;
  list-style: none;
  margin-right: 20px;
  width: 100%;
`;

const ModeButton = styled.button`
  width: 30%;
  cursor: pointer;
  border-color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  border-radius: 0;
  font-size: 14px;
  font-weight: 700;
`;

const UrlText = styled.p`
  cursor: pointer;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textColor};
`;

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
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
        <ModeButton onClick={toggleTheme}>
          {theme === lightTheme ? "Dark Mode" : "Light Mode"}
        </ModeButton>
        {!token ? (
          <ul>
            <HeaderLink>
              <Link to="/login">
                <UrlText>Login</UrlText>
              </Link>
            </HeaderLink>
            <HeaderLink>
              <Link to="/signup">
                <UrlText>Signup</UrlText>
              </Link>
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

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// css

// 홈페이지 메인 타이틀
const LogoContainer = styled.h1`
  display: flex;
  width: 17%;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img`
  vertical-align: top;
  max-width: 150px;
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
  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to="/">
          <Logo src="./main.png" alt="Home" />
        </Link>
      </LogoContainer>
      <HeaderList>
        <ul>
          <HeaderLink>
            <Link to="/login">Login</Link>
          </HeaderLink>
          <HeaderLink>
            <Link to="/signup">Sign up</Link>
          </HeaderLink>
        </ul>
      </HeaderList>
    </HeaderContainer>
  );
};

export default Header;

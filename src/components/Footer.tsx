import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex-wrap;
  padding: 10px;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #282c34;
`;

const LinkText = styled.a`
  color: #00bfff;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div>
        이메일:
        <LinkText href="mailto: hurgj123kr@gmail.com">
          hurgj123kr@gmail.com
        </LinkText>
      </div>
      <div>
        &copy; {new Date().getFullYear()} Sungho Heo. All rights reserved.
      </div>
    </FooterContainer>
  );
};

export default Footer;

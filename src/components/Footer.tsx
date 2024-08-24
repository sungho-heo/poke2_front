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

const TextColor = styled.p`
  color: white;
  text-transform: uppercase;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div>
        <TextColor>
          이메일:&nbsp;
          <LinkText href="mailto: hurgj123kr@gmail.com">
            hurgj123kr@gmail.com
          </LinkText>
        </TextColor>
      </div>
      <div>
        <TextColor>
          &copy; {new Date().getFullYear()} Sungho Heo. All rights reserved.
        </TextColor>
      </div>
    </FooterContainer>
  );
};

export default Footer;

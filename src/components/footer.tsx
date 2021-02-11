import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer style={{ textAlign: 'center' }}>
      © 2020 - 2021, Built with 💚 and
      <a href="https://gatsbyjs.org" target="_blank" style={{ paddingLeft: 5 }}>
        Gatsby
      </a>
    </FooterContainer>
  );
};

export default Footer;

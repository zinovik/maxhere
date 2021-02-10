import React from 'react';
import styled from 'styled-components';

const Logo = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding: 10px;

  min-height: 100vh;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Space = styled.div`
  min-height: 100vh;
`;

interface ParallaxImageProps {
  imageSrc: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ imageSrc }) => (
  <>
    <Logo style={{ backgroundImage: `url("${imageSrc}")` }} />
    <Space />
  </>
);

export default ParallaxImage;

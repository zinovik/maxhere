import React from 'react';
import styled from 'styled-components';

const getLogo = (
  imageSrc: string,
  backgroundSize: string = 'cover',
) => styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding: 10px;
  background-image: url('${imageSrc}');

  min-height: 100vh;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${backgroundSize};
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding: 0 20px;
`;

const Space = styled.div`
  min-height: 100vh;
`;

interface ParallaxImageProps {
  imageSrc: string;
  backgroundSize?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  imageSrc,
  backgroundSize,
  children,
}) => {
  const Logo = getLogo(imageSrc, backgroundSize);

  return (
    <>
      <Logo />
      <Container>{children}</Container>
      <Space />
    </>
  );
};

export default ParallaxImage;

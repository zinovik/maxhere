import React, { useState } from 'react';
import styled from 'styled-components';

const BigImageContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  z-index: 10;
  background-color: rgb(255, 255, 255, 0.8);
  cursor: pointer;
`;

const BigImage = styled.img`
  margin: 0;
  max-height: 100%;
  max-width: 100%;
`;

interface ImageProps {
  link: string;
  alt: string;
}

const CLOUDINARY_LINK = 'https://res.cloudinary.com/zinovik/image/upload/';
const TRANSFORM_LINK = 'c_scale,h_0.25,w_0.25/';

const Image: React.FC<ImageProps> = ({ link, alt }) => {
  const [isBigImage, setIsBigImage] = useState(false);

  const handleImageClick = () => {
    setIsBigImage(!isBigImage);
  };

  return (
    <>
      <img
        src={`${CLOUDINARY_LINK}${TRANSFORM_LINK}${link}`}
        alt={alt}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      {isBigImage && (
        <BigImageContainer onClick={handleImageClick}>
          <BigImage src={`${CLOUDINARY_LINK}${link}`} alt={alt} />
        </BigImageContainer>
      )}
    </>
  );
};

export default Image;

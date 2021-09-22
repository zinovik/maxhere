import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import MediaDescription from './media-description';
import { ThemeContext } from '../theme/theme-context';
import { themes } from '../theme/themes';

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
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

const SmallImage = styled.img`
  display: block;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
`;

const BigImage = styled.img`
  margin: 0;
  max-height: 100%;
  max-width: 100%;
`;

interface ImageProps {
  bigImageLink?: string;
  smallImageLink: string;
  alt?: string;
  dateTime?: string;
}

const Image: React.FC<ImageProps> = ({
  bigImageLink,
  smallImageLink,
  alt,
  dateTime,
}) => {
  const [isBigImage, setIsBigImage] = useState(false);
  const {
    state: { theme },
  } = useContext(ThemeContext);

  const handleImageClick = () => {
    setIsBigImage(!isBigImage);
  };

  const description =
    alt && dateTime ? `${alt}, ${dateTime}` : alt || dateTime || '';

  return (
    <>
      <SmallImage
        src={smallImageLink}
        alt={alt}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />

      {description && <MediaDescription description={description} />}

      {isBigImage && (
        <BigImageContainer
          onClick={handleImageClick}
          color={themes[theme].imageBackground}
        >
          <BigImage src={bigImageLink || smallImageLink} alt={alt} />
        </BigImageContainer>
      )}
    </>
  );
};

export default Image;

import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import ImageDescription from './image-description';
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
  margin-bottom: 0;
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

const getDateTimeFromFilename = (filename = '') => {
  const dateTimeParsed = filename.match(
    new RegExp('([\\d]{4})([\\d]{2})([\\d]{2})_([\\d]{2})([\\d]{2})'),
  );

  if (!Array.isArray(dateTimeParsed)) {
    return '';
  }

  const [_, year, month, date, hour, minute] = dateTimeParsed;

  return `${date}.${month}.${year} ${hour}:${minute}`;
};

const Image: React.FC<ImageProps> = ({ link, alt }) => {
  const [isBigImage, setIsBigImage] = useState(false);
  const [isTopPage, setIsTopPage] = useState(true);
  const {
    state: { theme },
  } = useContext(ThemeContext);

  const handleImageClick = () => {
    setIsBigImage(!isBigImage);
  };

  const dateTime = getDateTimeFromFilename(link);

  return (
    <>
      <SmallImage
        src={`${CLOUDINARY_LINK}${TRANSFORM_LINK}${link}`}
        alt={alt}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />

      {dateTime && (
        <ImageDescription description={`${alt && `${alt}, `} ${dateTime}`} />
      )}

      {isBigImage && (
        <BigImageContainer
          onClick={handleImageClick}
          color={themes[theme].imageBackground}
        >
          <BigImage src={`${CLOUDINARY_LINK}${link}`} alt={alt} />
        </BigImageContainer>
      )}
    </>
  );
};

export default Image;

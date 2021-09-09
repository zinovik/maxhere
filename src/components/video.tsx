import React, { useState, useEffect } from 'react';

import ImageDescription from './image-description';

interface VideoProps {
  link: string;
  alt: string;
}

const CLOUDINARY_LINK = 'https://res.cloudinary.com/zinovik/video/upload/';
const DEFAULT_WIDTH = 658;
const DEFAULT_BORDER = 16;

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

const Video: React.FC<VideoProps> = ({ link, alt }) => {
  const dateTime = getDateTimeFromFilename(link);

  const getWidth = () =>
    Math.min(document.body.offsetWidth - DEFAULT_BORDER, DEFAULT_WIDTH);

  const [videoWidth, setVideoWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    const resizeListener = () => {
      setVideoWidth(getWidth());
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <>
      <video width={videoWidth} controls>
        <source src={`${CLOUDINARY_LINK}${link}`} type="video/mp4" />
      </video>

      {dateTime && (
        <ImageDescription description={`${alt && `${alt}, `} ${dateTime}`} />
      )}
    </>
  );
};

export default Video;

import React from 'react';

import ImageDescription from './image-description';

interface VideoProps {
  link: string;
  alt: string;
}

const CLOUDINARY_LINK = 'https://res.cloudinary.com/zinovik/video/upload/';

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

  const pageWidth = document.body.offsetWidth;
  const videoWidth = Math.min(pageWidth - 16, 658);

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

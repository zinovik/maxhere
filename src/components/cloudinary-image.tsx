import React from 'react';

import Image from './image';

interface CloudinaryImageProps {
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

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ link, alt }) => {
  const dateTime = getDateTimeFromFilename(link);

  return (
    <Image
      bigImageLink={`${CLOUDINARY_LINK}${link}`}
      smallImageLink={`${CLOUDINARY_LINK}${TRANSFORM_LINK}${link}`}
      alt={alt}
      dateTime={dateTime}
    />
  );
};

export default CloudinaryImage;

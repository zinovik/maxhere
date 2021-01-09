import React from 'react';

interface ImageProps {
  link: string;
  alt: string;
}

const CLOUDINARY_LINK = 'https://res.cloudinary.com/zinovik/image/upload/';
const TRANSFORM_LINK = 'c_scale,h_0.25,w_0.25/';

const Image: React.FC<ImageProps> = ({ link, alt }) => {
  return (
    <a href={`${CLOUDINARY_LINK}${link}`} target="_blank">
      <img src={`${CLOUDINARY_LINK}${TRANSFORM_LINK}${link}`} alt={alt} />
    </a>
  );
};

export default Image;

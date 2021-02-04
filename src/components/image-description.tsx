import React from 'react';
import styled from 'styled-components';

const Description = styled.p`
  text-align: center;
  color: darkgray;
`;

interface DateProps {
  description: string;
}

const ImageDescription: React.FC<DateProps> = ({ description }) => {
  return (
    <Description>
      <small>{description}</small>
    </Description>
  );
};

export default ImageDescription;

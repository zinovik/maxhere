import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../theme/theme-context';
import { themes } from '../theme/themes';

const Description = styled.p`
  text-align: center;
  color: ${({ color }) => color};
`;

interface MediaDescriptionProps {
  description: string;
}

const MediaDescription: React.FC<MediaDescriptionProps> = ({ description }) => {
  const {
    state: { theme },
  } = useContext(ThemeContext);

  return (
    <Description color={themes[theme].imageDescription}>
      <small>{description}</small>
    </Description>
  );
};

export default MediaDescription;

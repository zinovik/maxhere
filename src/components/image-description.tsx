import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../theme/theme-context';
import { themes, ThemesNames } from '../theme/themes';

const Description = styled.p`
  text-align: center;
  color: ${({ color }) => color};
`;

interface DateProps {
  description: string;
}

const ImageDescription: React.FC<DateProps> = ({ description }) => {
  const {
    state: { theme },
  } = useContext(ThemeContext);

  return (
    <Description color={themes[theme].imageDescription}>
      <small>{description}</small>
    </Description>
  );
};

export default ImageDescription;

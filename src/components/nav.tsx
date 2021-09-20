import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import LinksList from './links-list';
import { ThemeContext } from '../theme/theme-context';
import { themes, ThemesNames } from '../theme/themes';

const NavContainer = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Space = styled.div`
  width: 100%;
  left: 0;
  top: 0;
  visibility: hidden;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ThemeSwitcher = styled.span`
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color}e7;
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
`;

interface NavProps {
  links: { fieldValue: string; totalCount: number }[];
  areTags?: boolean;
}

const Nav: React.FC<NavProps> = ({ links, areTags }) => {
  const [isTopPage, setIsTopPage] = useState(true);
  const {
    state: { theme },
    dispatch,
  } = useContext(ThemeContext);

  const handleScroll = () => setIsTopPage(window.scrollY < 5);

  const handleButtonClick = (currentTheme: ThemesNames): void =>
    dispatch(
      currentTheme === ThemesNames.DefaultDark
        ? { type: ThemesNames.DefaultLight }
        : { type: ThemesNames.DefaultDark },
    );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const linksSorted = links
    .slice()
    .reverse()
    .sort((l1, l2) => l2.totalCount - l1.totalCount);

  return (
    <>
      <NavContainer
        style={{
          backgroundColor: isTopPage
            ? 'transparent'
            : `${themes[theme].background}`,
          boxShadow: isTopPage ? 'none' : `0px 1px 1px ${themes[theme].shadow}`,
          transition: isTopPage ? '0s' : '2.5s',
        }}
      >
        <LinksList links={linksSorted} areTags={areTags} />
        <ThemeSwitcher
          onClick={() => handleButtonClick(theme)}
          color={themes[theme].text}
        />
      </NavContainer>

      <Space>
        <LinksList links={linksSorted} />
      </Space>
    </>
  );
};

export default Nav;

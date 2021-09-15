import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import LinksList from './links-list';

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

interface NavProps {
  links: { fieldValue: string; totalCount: number }[];
  areTags?: boolean;
}

const Nav: React.FC<NavProps> = ({ links, areTags }) => {
  const [isTopPage, setIsTopPage] = useState(true);

  const handleScroll = () =>
    setIsTopPage(document.documentElement.scrollTop < 5);

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
            : 'rgba(255, 255, 255, 0.9)',
          boxShadow: isTopPage ? 'none' : '0px 1px 1px lightgrey',
          transition: isTopPage ? '0s' : '2.5s',
        }}
      >
        <LinksList links={linksSorted} areTags={areTags} />
      </NavContainer>

      <Space>
        <LinksList links={linksSorted} />
      </Space>
    </>
  );
};

export default Nav;

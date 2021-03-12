import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TagsList from './tags-list';

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
  tags: { fieldValue: string; totalCount: number }[];
}

const Nav: React.FC<NavProps> = ({ tags }) => {
  const [isTopPage, setIsTopPage] = useState(false);

  const handleScroll = () =>
    setIsTopPage(
      (document.body.scrollTop || document.documentElement.scrollTop) === 0,
    );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <>
      <NavContainer
        style={{
          backgroundColor: isTopPage ? 'transparent' : 'white',
          boxShadow: isTopPage ? 'none' : '0px 1px 1px lightgrey',
          transition: isTopPage ? '0s' : '2.5s',
        }}
      >
        <TagsList
          tags={tags
            .slice()
            .reverse()
            .sort((t1, t2) => t2.totalCount - t1.totalCount)}
        />
      </NavContainer>
      <Space>
        <TagsList
          tags={tags
            .slice()
            .reverse()
            .sort((t1, t2) => t2.totalCount - t1.totalCount)}
        />
      </Space>
    </>
  );
};

export default Nav;

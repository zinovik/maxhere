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

  transition: 2.5s;
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
    <NavContainer
      style={{ backgroundColor: isTopPage ? 'transparent' : 'white' }}
    >
      <TagsList
        tags={tags
          .slice()
          .reverse()
          .sort((t1, t2) => t2.totalCount - t1.totalCount)}
      />
    </NavContainer>
  );
};

export default Nav;

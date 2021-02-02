declare const __PATH_PREFIX__: string;

import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import TagsList from '../components/tags-list';

import { rhythm, scale } from '../utils/typography';

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  flex-wrap: wrap;
`;

interface LayoutProps {
  location: {
    pathname: string;
  };
  title: string;
  tags?: { fieldValue: string; totalCount: number }[];
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ location, title, tags, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  const header =
    location.pathname === rootPath ? (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    ) : (
      <h3
        style={{
          marginTop: 0,
        }}
      >
        <Link
          style={{
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    );

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: rhythm(1 / 4),
      }}
    >
      {tags && (
        <TagsContainer>
          <TagsList
            tags={tags
              .slice()
              .reverse()
              .sort((t1, t2) => t2.totalCount - t1.totalCount)}
          />
        </TagsContainer>
      )}

      <header>{header}</header>

      <main>{children}</main>

      <footer>
        © 2020 - 2021, Built with 💚 and
        {` `}
        <a href="https://gatsbyjs.org" target="_blank">
          Gatsby
        </a>
      </footer>
    </div>
  );
};

export default Layout;

declare const __PATH_PREFIX__: string;

import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

interface LayoutProps {
  location: {
    pathname: string;
  };
  title: string;
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
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
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
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

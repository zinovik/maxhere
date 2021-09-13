declare const __PATH_PREFIX__: string;

import React from 'react';
import { Link } from 'gatsby';

import Nav from '../components/nav';
import Footer from '../components/footer';

import { rhythm, scale } from '../utils/typography';

interface LayoutProps {
  location: {
    pathname: string;
  };
  title: string;
  categories?: { fieldValue: string; totalCount: number }[];
  children: any;
}

const Layout: React.FC<LayoutProps> = ({
  location,
  title,
  categories,
  children,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  const Logo = () =>
    location.pathname === rootPath ? (
      <h1
        style={{
          ...scale(1.5),
          marginTop: rhythm(1 / 2),
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
          marginTop: rhythm(1),
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
      <header>
        {categories && <Nav links={categories} />}

        <Logo />
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;

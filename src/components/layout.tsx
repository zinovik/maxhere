declare const __PATH_PREFIX__: string;

import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Parallax } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';

import Nav from '../components/nav';
import Footer from '../components/footer';

import { rhythm, scale } from '../utils/typography';

const Main = styled.main`
  position: relative;
  z-index: 1;
  background-color: white;
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

  const Logo = () =>
    location.pathname === rootPath ? (
      <Parallax x={[-100, 25]}>
        <h1
          style={{
            ...scale(1.5),
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
      </Parallax>
    ) : (
      <h3>
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
    <ParallaxProvider>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: rhythm(1 / 4),
          paddingTop: rhythm(1),
        }}
      >
        <header>
          {tags && <Nav tags={tags} />}

          <Logo />
        </header>

        <Main>{children}</Main>

        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default Layout;

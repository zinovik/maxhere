import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { rhythm } from '../utils/typography';

const BioContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const Bio = () => {
  const data = useStaticQuery(graphql`
    query Bio {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            telegram
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;

  return (
    <BioContainer>
      <Img
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{ marginBottom: 0 }}>
        Written by{' '}
        <strong>
          <a href={`https://t.me/${social.telegram}`} target="_blank">
            {author.name}
          </a>
        </strong>
        {author.summary}
      </p>
    </BioContainer>
  );
};

export default Bio;

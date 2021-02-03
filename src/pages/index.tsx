import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BackToTop from '../components/back-to-top';
import Date from '../components/date';
import { CommentsCount } from '../components/disqus';

import { scale } from '../utils/typography';
import { BlogIndexQuery } from '../../gatsby-graphql';

const Title = styled.h3`
  margin: 10px 0;
`;

const Article = styled.article`
  margin-bottom: 40px;
`;

const PostImg = styled(Img)`
  margin: 0px;
`;

interface BlogIndexProps {
  data: BlogIndexQuery;
  location: {
    pathname: string;
  };
}

const BlogIndex: React.FC<BlogIndexProps> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? '';

  const posts = data.allMdx.edges;
  const allTags = data.allMdx.group;

  const shortname = process.env.GATSBY_DISQUS_NAME || 'maxhere';

  return (
    <Layout location={location} title={siteTitle} tags={allTags}>
      <SEO title="All posts" />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;

        return (
          <Article key={node.fields.slug}>
            <header>
              <Date date={node.frontmatter.date} />
              <Link to={node.fields.slug}>
                {node.frontmatter.featuredImage && (
                  <>
                    <PostImg
                      fluid={
                        node.frontmatter.featuredImage.childImageSharp.fluid
                      }
                      imgStyle={{ objectFit: 'contain' }}
                    />
                    <p
                      style={{
                        ...scale(-1 / 5),
                        color: 'darkgray',
                        margin: '0px',
                      }}
                    >
                      {node.frontmatter.imageDescription}
                    </p>
                  </>
                )}
                <Title>{title}</Title>
              </Link>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <CommentsCount
                slug={node.fields.slug}
                title={node.frontmatter.title}
                shortname={shortname}
              />
            </section>
          </Article>
        );
      })}
      <BackToTop />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            imageDescription
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
